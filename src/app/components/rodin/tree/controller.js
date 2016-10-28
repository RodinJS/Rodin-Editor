/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;
let isFirst = true;

class TreeCtrl {
  constructor($scope, $timeout, Editor, $log, FileUtils, RodinTabs, RodinTree, RodinIdea) {
    'ngInject';

    self = this;
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._Editor = Editor;
    this._RodinTabs = RodinTabs;
    this._RodinTree = RodinTree;
    this._FileUtils = FileUtils;
    this._RodinIdea = RodinIdea;
    this._$log = $log;

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
  }

  toggle(scope) {
    scope.toggle();
  };

  updateTree() {
    return this._RodinTree.update();
  }


  getFileOptions(...args) {
    return this._FileUtils.getFileOptions(...args);
  }

  isFolder(node) {
    return (node.type == 'directory');
  }

  isVisible(node) {
    return !(this.treeFilter && this.treeFilter.length > 0 && node.name.indexOf(this.treeFilter) == -1);
  }

  open(scope = {}, node = {}) {
    if (node.type == "directory") {
      return this.toggle(scope);
    } else {
      self._RodinTree.openFile(node);
    }
  }

  _delete($itemScope, $event, node, text, $li) {
    let ans = confirm("Are you sure delete file: " + node.name);

    if (ans) {
      self._RodinTree.deleteFile(node);
    }
  }

  _rename($itemScope, $event, node, text, $li) {
    let name = prompt("Change file name.", node.name);

    if (name) {

      self._RodinTree.renameFile(node, {
        action: "rename",
        newName: name,
      });

    }
  }

  _createFolder($itemScope, $event, node, text, $li) {
    let name = prompt("Folder name.");

    if (name) {

      self._RodinTree.createFolder(node, {
        path: node.path,
        name: name,
        action: "create"
      });

    }
  }

  _createFile($itemScope, $event, node, text, $li) {
    let name = prompt("File name.");

    if (name) {
      self._RodinTree.createFile(node, {
        path: node.path,
        name: name,
        action: "create"
      });

    }
  }
}

export default TreeCtrl;

