/**
 * Created by kh.levon98 on 17-Oct-16.
 */


import * as _ from "lodash/dist/lodash.min";
import angular from 'angular/index';
import ace from "ace/ace";


function RodinEditorFactory(Utils, RodinTabs, FileUtils, Ace, RodinTabsConstants, $emit, Storage, File, RodinIdea) {
  'ngInject';

  window.Storage = Storage;

  let model = {};
  let tabsComponentId = RodinTabsConstants.editor;

  model.options = {
    model: "",
    path: "",
    ace: {
      workerPath: "/scripts/vendor/ace",
      get theme() {
        return Storage.get("theme")
      },
      mode: 'text',
      showGutter: true,
      showPrintMargin: false,
      // cursorPosition: 0,
      commands: [{
        name: 'save',
        bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
        exec: ()=> {
          File.save(RodinIdea.getProjectId(), RodinTabs.get(tabsComponentId));
        }
      }],
      advanced: {
        basePath: "/scripts/vendor/",
        fontSize: "12px",
        tabSize: 4,
        wrap: true,
        readOnly: false,
        enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
        enableSnippets: true,
        autoScrollEditorIntoView: true,
      },
      onLoad: function (editor) {
        if (editor.getValue().length) {
          const data = RodinTabs.get(tabsComponentId);
          if (_.isObject(data.editor)) {

            Ace.session.$undoManager.$doc = Ace.session; // workaround for a bug in ace

            Ace.session.setOptions(data.editor.options);

            Ace.session.$undoManager.$undoStack = data.editor.history.undo;

            Ace.session.$undoManager.dirtyCounter = data.editor.history.undo.length;

            Ace.session.$undoManager.$redoStack = data.editor.history.redo;

            //////////////////////////////

            Ace.session.setScrollTop(data.editor.scrollTop);
            Ace.session.setScrollLeft(data.editor.scrollLeft);

            Ace.session.selection.fromJSON(data.editor.selection);

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

          file.isUnsaved = (file.originalContent != file.content); /// TODO: fix this fucking logic
        }
      }
    }
  };


  model.openFile = openFile;
  model.saveState = saveState;


  //// Editor shortcuts ////

  model.undo = undo;
  model.redo = redo;
  model.findInFile = findInFile;
  model.findInFolder = findInFolder;
  model.replaceInFile = replaceInFile;
  model.replaceInFolder = replaceInFolder;
  model.goToLine = goToLine;


  return model;

  function openFile(data = null) {
    if (data) {
      if (data.path !== model.options.path) {
        const editorMode = FileUtils.getFileOptions(data).editorMode;

        model.options.path = data.path;

        model.options.ace.mode = editorMode;
      }
    } else {
      model.options.path = "";
      model.options.ace.mode = "text";
    }
  }

  function saveState(activeFile = RodinTabs.get(tabsComponentId)) {
    if (activeFile && !activeFile.isBlank) {

      /// save tab state after change it
      let cursor = Ace.editor.selection.getCursor();

      if (!_.isObject(activeFile.editor)) {
        activeFile.editor = {};
      }

      activeFile.editor.selection = Ace.session.selection.toJSON();

      activeFile.editor.scrollTop = Ace.session.getScrollTop();

      activeFile.editor.scrollLeft = Ace.session.getScrollLeft();

      activeFile.editor.options = Ace.session.getOptions();

      if (!_.isObject(activeFile.editor.history)) {
        activeFile.editor.history = {};
      }
      activeFile.editor.history.undo = Ace.session.$undoManager.$undoStack.map(filterHistory);
      activeFile.editor.history.redo = Ace.session.$undoManager.$redoStack.map(filterHistory);


      activeFile.editor.column = cursor.column;
      activeFile.editor.row = cursor.row;


    }
  }

  ///////////////////////// Editor shortcuts ////////////////////////////
  function undo() {
    Ace.editor.execCommand("undo");
  }

  function redo() {
    Ace.editor.execCommand("redo");
  }

  function findInFile() {
    Ace.editor.execCommand("find");
  }

  function findInFolder() {
    console.log("findInFolder");
  }

  function replaceInFile() {
    Ace.editor.execCommand("replace");
  }

  function replaceInFolder() {
    console.log("findInFolder");
  }

  function goToLine() {
    Ace.editor.execCommand("gotoline");
  }

  /////////////////////////////////////////////////////

  ///// Local functions
  function filterHistory(deltas) {
    return deltas.filter(function (d) {
      return d.group != "fold";
    });
  }
}

export default RodinEditorFactory;