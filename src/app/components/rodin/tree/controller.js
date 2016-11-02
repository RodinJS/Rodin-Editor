/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import JSZip from "jszip/dist/jszip.min";

let self;

class TreeCtrl {
  constructor($scope, $timeout, Editor, $log, FileUtils, RodinTabs, RodinTree, RodinIdea, Modal, $on) {
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
    this._$on = $on;

    this.data = this._RodinTree.data;
    this.treeFilter = "";

    this.fileMenuOptions = [
      ['Rename...', this._rename],
      ['Delete File', this._delete]
    ];

    this.directoryMenuOptions = [
      ['New File', this._createFile],
      ['Rename...', this._rename],
      null,
      ['New Folder', this._createFolder],
      ['Delete Folder', this._delete],
      // ['Find in Folder', this._findInFolder]
    ];

    this._$scope.$watch(()=> {
      return this._RodinIdea.getProjectId();
    }, (id)=> {
      if (id) {
        this._RodinTree.update(["index.js", "index.html", ".html", ".js"]);
      }
    });


    this._$on("menu-bar:uploadFile", (e, node, model)=> {
      self._uploadFile();
    });

    this._$on("menu-bar:uploadFolder", (e, node, model)=> {
      self._uploadFolder();
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
        action: "rename",
        newName: res.name,
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
        name: res.name,
        action: "create"
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
        name: res.name,
        action: "create"
      });
    });
  }


  _uploadFile(path = "") {
    self._Modal.upload({
      path: ()=> {
        return path;
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

  _uploadFolder(path = "") {
    self._Modal.upload({
      path: ()=> {
        return path;
      },
      type: ()=> {
        return "directory";
      }
    }).result.then((res)=> {

      let zip = new JSZip();

      for (let i = 0, ln = res.files.length; i < ln; ++i) {
        let file = res.files[i];

        // console.log("zip - file", file)

        zip.file(file);
      }

      zip.generateAsync({type: "blob"})
        .then(function (content) {
          console.log("content", content)

          var fileReader = new FileReader();
          fileReader.onload = function () {
            console.log("fr", this.result)
            self._RodinTree.uploadFolder([this.result], {
              path: res.path,
            });
          };
          fileReader.readAsArrayBuffer(content);

        });


    });
  }
}

export default TreeCtrl;

