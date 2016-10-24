/**
 * Created by kh.levon98 on 17-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

function RodinEditorFactory(Utils, RodinTabs, FileUtils, Ace, $timeout) {
  'ngInject';

  let model = {};
  let projectId = null;
  let tabsComponentId = "editor_tabs";

  model.options = {
    model: "",
    ace: {
      workerPath: "/scripts/vendor/ace/lib/ace",
      advanced: {},
      theme: 'monokai',
      mode: 'text',
      onLoad: function (editor) {
        if (editor.getValue().length) {
          const data = RodinTabs.get(tabsComponentId);
          if (_.isObject(data.editor)) {
            Ace.editor.selection.moveTo(data.editor.row, data.editor.column);
          }
        }
      },
      onChange: function (params) {
        const editor = params[1];
        if (editor.getValue().length) {
          const file = RodinTabs.get(tabsComponentId);
          /*if (!file.isUnsaved && file.originalContent != model.options.model) {
           file.isUnsaved = true;
           }*/

          file.isUnsaved = (file.originalContent != model.options.model); /// TODO: fix this fuckin logic
        }
      }
    }
  };


  model.openFile = openFile;
  model.saveState = saveState;

  model.setTabsComponentId = setTabsComponentId;
  model.setProjectId = setProjectId;


  return model;

  function openFile(data) {
    if (data) {
      const editorMode = FileUtils.getFileOptions(data).editorMode;
      model.options.model = data.content;
      model.options.ace.mode = editorMode;
    } else {
      model.options.model = "";
      model.options.ace.mode = "text";
    }
  }

  function saveState(activeFile = RodinTabs.get(tabsComponentId)) {
    if (activeFile && !activeFile.isBlank) {

      /// save tab state after change it
      let cursor = Ace.editor.selection.getCursor();

      activeFile.content = model.options.model;

      activeFile.editor.column = cursor.column;
      activeFile.editor.row = cursor.row;

    }
  }

  ///////////////////////// Editor shortcuts ////////////////////////////
  function undo() {

  }

  function redo() {

  }

  function findInFile() {

  }

  function findInFolder() {

  }

  function replaceInFile() {

  }

  function replaceInFolder() {

  }

  function goToLine() {

  }

  /////////////////////////////////////////////////////


  /// local variables setter/getter functions
  function setTabsComponentId(id) {
    tabsComponentId = id;
  }

  function setProjectId(id) {
    projectId = id;
  }
}

export default RodinEditorFactory;