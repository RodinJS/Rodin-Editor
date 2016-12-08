/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import JSZip from "jszip/dist/jszip.min";
import * as _ from "lodash/dist/lodash.min";


let self;

class TreeCtrl {

  constructor($scope, $timeout, Editor, $log, FileUtils, RodinTabs, RodinTree, RodinIdea, Modal, $on, $q, Notification, Storage, Utils) {
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
    this._Storage = Storage;
    this._Utils = Utils;
    this._Notification = Notification;
    this._$log = $log;
    this._$q = $q;
    this._$on = $on;

    this.data = this._RodinTree.data;
    this.treeFilter = "";
    this._buffer = null;

    this.rootMenuOptions = [
      ['New File', this._createFile],
      ['Upload File', this._uploadFile],
      ['Paste', ($itemScope, $event, node, text, $li) => {
        this._paste($itemScope, $event, node, text, $li).then((data) => {
          this._Notification.success("File successfully copied.");
        }, (err) => {
          this._Notification.error("Can't copy file.");
        });
      }],
      null,
      ['New Folder', this._createFolder],
      ['Upload Folder', this._uploadFolder],
      // ['Find in Folder', this._findInFolder]
    ];

    this.fileMenuOptions = [
      ['Rename...', this._rename],
      ['Copy', this._copy],
      ['Delete File', this._delete]
    ];

    this.directoryMenuOptions = [
      ['New File', this._createFile],
      ['Upload File', this._uploadFile],
      ['Rename...', this._rename],
      ['Copy', this._copy],
      ['Paste',  ($itemScope, $event, node, text, $li) => {
        this._paste($itemScope, $event, node, text, $li).then((data) => {
          this._Notification.success("File successfully copied.");
        }, (err) => {
          this._Notification.error("Can't copy file.");
        });
      }],
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
        if (sourceNode.parent !== destNode.path && destNode.type === "directory") {
          let _buffer = this._buffer;
          this._copy(null, null, sourceNode);

          this._paste(null, null, destNode, null, null, true).then(() => {
            self._RodinTree.deleteFile(sourceNode).then(() => {
              this._Notification.success("File successfully moved.");
              deferred.resolve();
            }, () => {
              this._Notification.warning("File successfully moved, but original file can't be removed.");
              deferred.reject();
            });
          }, () => {
            this._Notification.error("Can't move file");
            deferred.reject();
          });

          self._buffer = _buffer;
        } else {
          deferred.reject();
        }

        return deferred.promise;
      }
    };

    this._$scope.$watch(() => {
      return this._RodinIdea.getProjectId();
    }, (id) => {
      if (id) {
        let state = this._Storage.get("treeState")[this._RodinIdea.getProjectId()];

        let folderPath = _.concat([""], _.keys(_.pickBy(state, (v, k, o) => {
          return v;
        })));

        this._RodinTree.update({
          firstCall: true,
          folderPath: folderPath,
          openFile: ["index.js", "index.html", ".html", ".js"],
          // runFile: ["index.html", ".html"]
        });
      }
    });


    this._$on("menu-bar:uploadFile", (e, node, model) => {
      self._uploadFile(null, null, node);
    });

    this._$on("menu-bar:uploadFolder", (e, node, model) => {
      self._uploadFolder(null, null, node);
    });

    this._$on("menu-bar:newFile", (e, node, model) => {
      self._createFile(null, null, node);
    });

    this._$on("menu-bar:newFolder", (e, node, model) => {
      self._createFolder(null, null, node);
    });

  }


  updateTree() {
    return this._RodinTree.update({
      folderPath: this._Utils.filterTree(this._RodinTree.data, {active: true}, "path")
    });
  }

  open(scope = {}, node = {}) {
    if (node.type == "directory") {
      return this.toggle(scope);
    } else {
      self._RodinTree.openFile(node);
    }
  }


  toggle(scope) {
    if (scope.node.type == "file") {
      return false;
    }

    let globState = this._Storage.get("treeState");
    let state = globState[this._RodinIdea.getProjectId()];


    scope.node.active = !scope.node.active;
    state[scope.node.path] = scope.node.active;

    if (scope.node.active && _.isEmpty(scope.node.children)) {
      this._RodinTree.update({
        folderPath: scope.node.path
      });
    } else if (!scope.node.active) {
      for (let i in state) {
        if (i.indexOf(scope.node.path) > -1) {
          state[i] = false;
        }
      }
    }

    scope.toggle();

    this._Storage.set("treeState", globState);
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
      message: () => {
        return `Are you sure delete ${node.type}: ${node.name}`;
      }
    }).result.then((res) => {
      self._RodinTree.deleteFile(node);
    });
  }

  _rename($itemScope, $event, node, text, $li) {
    self._Modal.rename({
      name: () => {
        return node.name;
      }
    }).result.then((res) => {

      self._RodinTree.renameFile(node, {
        newName: res.newName
      });

    });
  }

  _createFolder($itemScope, $event, node, text, $li) {
    self._Modal.create({
      name: () => {
        return "";
      },
      path: () => {
        return node.path;
      },
      type: () => {
        return "directory";
      }
    }).result.then((res) => {
      self._RodinTree.createFolder(node, {
        path: res.path,
        name: res.name
      });
    });
  }

  _createFile($itemScope, $event, node, text, $li) {

    self._Modal.create({
      name: () => {
        return "";
      },
      path: () => {
        return node.path;
      },
      type: () => {
        return "file";
      }
    }).result.then((res) => {
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

    if (self._buffer && node.type === "directory") {
      self._Modal.create({
        name: () => {
          return self._buffer.name;
        },
        path: () => {
          return node.path;
        },
        srcPath: () => {
          return self._buffer.path;
        },
        type: () => {
          return self._buffer.type;
        }
      }).result.then((res) => {
        if (res.type === "file") {
          self._RodinTree.copyFile(node, {
            name: res.name,
            path: res.path,
            srcPath: res.srcPath
          }).then((res) => {
            deferred.resolve(res);
          }, (err) => {
            deferred.reject(err);
          });
        } else {
          self._RodinTree.copyFolder(node, {
            name: res.name,
            path: res.path,
            srcPath: res.srcPath
          }).then((res) => {
            deferred.resolve(res);
          }, (err) => {
            deferred.reject(err);
          });
        }
      }, () => {
        deferred.reject();
      });
    }

    return deferred.promise;
  }

  _uploadFile($itemScope, $event, node, text, $li) {
    self._Modal.upload({
      path: () => {
        return node.path;
      },
      type: () => {
        return "file";
      }
    }).result.then((res) => {
      self._RodinTree.uploadFile(res.files, {
        path: res.path,
      });
    });
  }

  _uploadFolder($itemScope, $event, node, text, $li) {
    self._Modal.upload({
      path: () => {
        return node.path;
      },
      type: () => {
        return "directory";
      }
    }).result.then((res) => {

      let zip = new JSZip();
      let deferred = self._$q.defer();
      let promise = deferred.promise;

      for (let i = 0, ln = res.files.length; i < ln; ++i) {
        let file = res.files[i];
        let deferred = self._$q.defer();

        promise.then(() => {
          let reader = new FileReader();
          let filePath = file.webkitRelativePath || file.name;

          reader.onload = (e) => {
            zip.file(filePath, e.target.result, {binary: true});

            deferred.resolve(true);
          };

          reader.readAsBinaryString(file);
        });

        promise = deferred.promise;
      }

      deferred.resolve(true);

      promise.then(() => {
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

