/**
 * Created by kh.levon98 on 24-Sep-16.
 */

import * as _ from "lodash/dist/lodash.min";

let self;

class EditorCtrl {

  constructor($scope, RodinTabs, RodinEditor, Ace, $on, RodinTabsConstants) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._RodinTabs = RodinTabs;
    this._RodinEditor = RodinEditor;
    this._Ace = Ace;


    this.options = this._RodinEditor.options;

    this.aceConfig = this._RodinEditor.options.ace;

    this.tabsComponentId = RodinTabsConstants.editor;

    this.tabsCallbacks = {
      "close": this.closeFile,
      "change": this.switchFile,
    };


    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:undo", (e, node, model)=> {
      self._RodinEditor.undo(node, model);
    });

    this._$on("menu-bar:redo", (e, node, model)=> {
      self._RodinEditor.redo(node, model);
    });


    this._$on("menu-bar:findInFile", (e, node, model)=> {
      self._RodinEditor.findInFile(node, model);
    });


    this._$on("menu-bar:findInFolder", (e, node, model)=> {
      self._RodinEditor.findInFolder(node, model);
    });


    this._$on("menu-bar:replaceInFile", (e, node, model)=> {
      self._RodinEditor.replaceInFile(node, model);
    });


    this._$on("menu-bar:replaceInFolder", (e, node, model)=> {
      self._RodinEditor.replaceInFolder(node, model);
    });

    this._$on("menu-bar:goToLine", (e, node, model)=> {
      self._RodinEditor.goToLine(node, model);
    });

  }

  closeFile(oldFile, newFile) {
    self._RodinEditor.openFile((newFile.isBlank ? null : newFile));
  }

  switchFile(oldFile, newFile) {

    self._RodinEditor.saveState(oldFile);

    self._RodinEditor.openFile(newFile); /// change ace content and settings
  }
}

export default EditorCtrl;