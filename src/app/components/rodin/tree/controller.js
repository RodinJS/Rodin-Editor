/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import JSZip from "jszip/dist/jszip.min";

let self;

class TreeCtrl {

  constructor($scope, $timeout, Editor, $log, FileUtils, RodinTabs, RodinTree, RodinIdea, Modal, $on, $q) {
    'ngInject';

    self = this;
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._Editor = Editor;
    this._RodinTabs = RodinTabs;
    this._RodinTree = RodinTree;
    this._FileUtils = FileUtils;
    this._RodinIdea = RodinIdea;
    this._Modal = Modal;
    this._$log = $log;
    this._$q = $q;
    this._$on = $on;

    this.data = this._RodinTree.data;
    this.treeFilter = "";
    this._buffer = null;

    this.fileMenuOptions = [
      ['Rename...', this._rename],
      ['Copy', this._copy],
      ['Paste', this._paste],
      ['Delete File', this._delete]
    ];

    this.directoryMenuOptions = [
      ['New File', this._createFile],
      ['Upload File', this._uploadFile],
      ['Rename...', this._rename],
      ['Copy', this._copy],
      ['Paste', this._paste],
      null,
      ['New Folder', this._createFolder],
      ['Upload Folder', this._uploadFolder],
      ['Delete Folder', this._delete],
      // ['Find in Folder', this._findInFolder]
    ];

    this.treeOptions = {
      beforeDrop: (e) => {
        let deferred = self._$q.defer();
        let sourceNode = e.source.nodeScope.$modelValue;
        let destNode = e.dest.nodesScope.node;
        let _buffer = this._buffer;
        this._copy(null, null, sourceNode);

        this._paste(null, null, destNode, null, null, true).then(()=> {
          this._delete(null, null, sourceNode).then(()=> {
            deferred.resolve();
          }, ()=> {
            deferred.reject();
          });
        }, ()=> {
          deferred.reject();
        });

        self._buffer = _buffer;

        return deferred.promise;
      }
    };

    this._$scope.$watch(()=> {
      return this._RodinIdea.getProjectId();
    }, (id)=> {
      if (id) {
        this._RodinTree.update(["index.js", "index.html", ".html", ".js"]);
      }
    });


    this._$on("menu-bar:uploadFile", (e, node, model)=> {
      self._uploadFile(null, null, node);
    });

    this._$on("menu-bar:uploadFolder", (e, node, model)=> {
      self._uploadFolder(null, null, node);
    });

    this._$on("menu-bar:newFile", (e, node, model)=> {
      self._createFile(null, null, node);
    });

    this._$on("menu-bar:newFolder", (e, node, model)=> {
      self._createFolder(null, null, node);
    });

  }


  updateTree() {
    return this._RodinTree.update();
  }

  open(scope = {}, node = {}) {
    if (node.type == "directory") {
      return this.toggle(scope);
    } else {
      self._RodinTree.openFile(node);
    }
  }


  toggle(scope) {
    scope.toggle();
  };

  getFileOptions(...args) {
    return this._FileUtils.getFileOptions(...args);
  }

  isFolder(node) {
    return (node.type == 'directory');
  }

  isVisible(node) {
    return !(this.treeFilter && this.treeFilter.length > 0 && node.name.indexOf(this.treeFilter) == -1);
  }


  _delete($itemScope, $event, node, text, $li) {
    self._Modal.confirm({
      message: ()=> {
        return `Are you sure delete ${node.type}: ${node.name}`;
      }
    }).result.then((res)=> {
      self._RodinTree.deleteFile(node);
    });
  }

  _rename($itemScope, $event, node, text, $li) {
    self._Modal.rename({
      name: ()=> {
        return node.name;
      }
    }).result.then((res)=> {

      self._RodinTree.renameFile(node, {
        newName: res.newName
      });

    });
  }

  _createFolder($itemScope, $event, node, text, $li) {
    self._Modal.create({
      name: ()=> {
        return "";
      },
      path: ()=> {
        return node.path;
      },
      type: ()=> {
        return "directory";
      }
    }).result.then((res)=> {
      self._RodinTree.createFolder(node, {
        path: res.path,
        name: res.name
      });
    });
  }

  _createFile($itemScope, $event, node, text, $li) {

    self._Modal.create({
      name: ()=> {
        return "";
      },
      path: ()=> {
        return node.path;
      },
      type: ()=> {
        return "file";
      }
    }).result.then((res)=> {
      self._RodinTree.createFile(node, {
        path: res.path,
        name: res.name
      });
    });
  }

  _copy($itemScope, $event, node, text, $li) {
    self._buffer = node;
  }

  _paste($itemScope, $event, node, text, $li) {

    let deferred = self._$q.defer();

    if (self._buffer) {
      self._Modal.create({
        name: ()=> {
          return self._buffer.name;
        },
        path: ()=> {
          return node.path;
        },
        srcPath: ()=> {
          return self._buffer.path;
        },
        type: ()=> {
          return self._buffer.type;
        }
      }).result.then((res)=> {
        if (res.type === "file") {
          self._RodinTree.copyFile(node, {
            name: res.name,
            path: res.path,
            srcPath: res.srcPath
          }).then((res)=> {
            deferred.resolve(res);
          }, (err)=> {
            deferred.reject(err);
          });
        } else {
          self._RodinTree.copyFolder(node, {
            name: res.name,
            path: res.path,
            srcPath: res.srcPath
          }).then((res)=> {
            deferred.resolve(res);
          }, (err)=> {
            deferred.reject(err);
          });
        }
      }, ()=> {
        deferred.reject();
      });
    }

    return deferred.promise;
  }

  _uploadFile($itemScope, $event, node, text, $li) {
    self._Modal.upload({
      path: ()=> {
        return node.path;
      },
      type: ()=> {
        return "file";
      }
    }).result.then((res)=> {
      self._RodinTree.uploadFile(res.files, {
        path: res.path,
      });
    });
  }

  _uploadFolder($itemScope, $event, node, text, $li) {
    self._Modal.upload({
      path: ()=> {
        return node.path;
      },
      type: ()=> {
        return "directory";
      }
    }).result.then((res)=> {

      let zip = new JSZip();
      let deferred = self._$q.defer();
      let promise = deferred.promise;

      for (let i = 0, ln = res.files.length; i < ln; ++i) {
        let file = res.files[i];
        let deferred = self._$q.defer();

        promise.then(()=> {
          let reader = new FileReader();
          let filePath = file.webkitRelativePath || file.name;

          console.log("file - ", i, file);

          reader.onload = (e)=> {
            zip.file(filePath, e.target.result);

            deferred.resolve(true);
          };

          reader.readAsText(file);
        });

        promise = deferred.promise;
      }

      deferred.resolve(true);

      promise.then(()=> {
        console.log("end")
        zip.generateAsync({type: "blob"})
          .then(function (content) {
            self._RodinTree.uploadFolder([content], {
              path: res.path,
            });
          });
      });

    });
  }

}

export default TreeCtrl;

