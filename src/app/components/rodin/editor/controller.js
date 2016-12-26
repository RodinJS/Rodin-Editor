/**
 * Created by kh.levon98 on 24-Sep-16.
 */

import * as _ from "lodash/lodash.min";

let self;

class EditorCtrl {

  constructor($scope, RodinTabs, RodinEditor, Ace, $on, RodinTabsConstants, File, Modal, $q, Storage, RodinIdea) {
    'ngInject';

    self = this;

    this._$scope = $scope;
    this._$on = $on;
    this._$q = $q;
    this._RodinTabs = RodinTabs;
    this._File = File;
    this._Modal = Modal;
    this._RodinEditor = RodinEditor;
    this._Ace = Ace;
    this._Storage = Storage;
    this._RodinIdea = RodinIdea;
    this.file = {};


    $scope.$watch(() => Ace.session, () => {

      console.log("watch", Ace.session)
      if (Ace.session) {
        let ll = function () {
          console.log("changeSession", arguments)
        };

        Ace.session.removeListener('change', ll);

        Ace.session.on("changeSession", ll);

        Ace.session.removeListener('changeSelectionStyle', ll);

        Ace.session.on("changeSelectionStyle", ll);
      }
    });


    this.options = this._RodinEditor.options;

    this.aceConfig = this._RodinEditor.options.ace;

    this.tabsComponentId = RodinTabsConstants.editor;

    this.tabsCallbacks = {
      "close": this._closeFile,
      "change": this._switchFile,
      "stateMiddleware": this._storeFileMiddleware
    };

    this._$on(`tabs:${this.tabsComponentId}:change-active-tab`, () => {
      let file = this._RodinTabs.get(this.tabsComponentId);
      this._RodinEditor.openFile(!_.isEmpty(file) && !file.isBlank ? file : null);
      this.file = file;
      /*
       self._RodinEditor.saveState();
       self._RodinTabs.saveState(this.tabsComponentId);
       */

    });

    ///////// subscribe menu-bar events //////////

    this._$on("menu-bar:saveFile", (e, node, model) => {
      self._File.save(self._RodinTabs.get(self.tabsComponentId));
    });

    this._$on("menu-bar:saveAllFiles", (e, node, model) => {
      let filesList = self._RodinTabs.getList(self.tabsComponentId);

      filesList.map((file, index, list) => {
        self._File.save(file, index === (list.length - 1));
      });
    });

    this._$on("menu-bar:undo", (e, node, model) => {
      self._RodinEditor.undo(node, model);
    });

    this._$on("menu-bar:redo", (e, node, model) => {
      self._RodinEditor.redo(node, model);
    });


    this._$on("menu-bar:findInFile", (e, node, model) => {
      self._RodinEditor.findInFile(node, model);
    });


    this._$on("menu-bar:findInFolder", (e, node, model) => {
      self._RodinEditor.findInFolder(node, model);
    });


    this._$on("menu-bar:replaceInFile", (e, node, model) => {
      self._RodinEditor.replaceInFile(node, model);
    });


    this._$on("menu-bar:replaceInFolder", (e, node, model) => {
      self._RodinEditor.replaceInFolder(node, model);
    });

    this._$on("menu-bar:goToLine", (e, node, model) => {
      self._RodinEditor.goToLine(node, model);
    });

  }

  _closeFile(oldFile, newFile) {
    if (oldFile.isUnsaved) {
      let deferred = self._$q.defer();

      self._Modal.confirm({
        message: () => {
          return "Are you sure you want to close unsaved file?";
        }
      }).result.then(() => {
        deferred.resolve();
      }, () => {
        deferred.reject();
      });

      return deferred.promise;
    }
  }

  _switchFile(oldFile, newFile) {
    self._RodinEditor.saveState(oldFile);
  }

  _storeFileMiddleware(state) {
    let data = state.data;
    for (let i = 0, ln = data.length; i < ln; i++) {
      let file = data[i];

      if (!file.isUnsaved) {
        delete file.content;
        delete file.originalContent;
      }

    }
    return state;
  }
}

export default EditorCtrl;