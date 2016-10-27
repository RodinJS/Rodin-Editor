/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

let isFirstCall = true;

class RIDEACtrl {
  constructor($scope, FileUtils, Editor, AppConstants, User, $stateParams, $on, $emit, Storage) {
    'ngInject';
    self = this;

    this._$scope = $scope;
    this._FileUtils = FileUtils;
    this._Editor = Editor;
    this._User = User;
    this._AppConstants = AppConstants;
    this._$on = $on;
    this._$emit = $emit;
    this._Storage = Storage;
    this.tabs = [{
      name: "untitled",
      isBlank: true,
      isUnsaved: false
    }];

    this.currentUser = User.current;
    this.fileContent = '';
    this.openedFileIndex = 0;
    this.iframeUrl = "";
    this.openedWindows = {};
    this.isEnabledAutoReload = this._Storage.get("isEnabledAutoReload");

    this.aceOptions = {
      workerPath: "/scripts/vendor/ace",
      theme: 'monokai',
      mode: 'text',
      showGutter: true,
      showPrintMargin: false,
      // cursorPosition: 0,
      commands: [{
        name: 'save',
        bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
        exec: this.saveFile
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
      onLoad: function (_ace) {
        console.log("load")
        // self.tabs[self.openedFileIndex].isUnsaved = false;
      },
      onChange: function (_ace) {
        let evt = _ace[0];
        console.log(evt)
        if (evt.start.column != 0 && evt.start.row != 0) {
          console.log("change")
          self.tabs[self.openedFileIndex].isUnsaved = true;
        }
      }
    };

    this.menuList = [
      {
        "name": "File",
        "subMenus": [
          /*{
           "name": "<span class='text'>New File</span><i class='hotkey'>Ctrl+N</i>",
           "event": "newfile"
           },
           {
           "name": "<span class='text'>New Folder</span><i class='hotkey'>Ctrl+Shift+N</i>",
           "event": "newFolder"
           },
           {
           "name": "<span class='text'>Open File</span><i class='hotkey'>Ctrl+O</i>",
           "event": "openFile"
           },
           {
           "name": "<span class='text'>Open Folder</span><i class='hotkey'>Ctrl+Shift+O</i>",
           "event": "openFolder"
           },*/
          {
            "name": "<span class='text'>Save</span><i class='hotkey'>Ctrl+S</i>",
            "event": "save"
          },
          /*{
           "name": "<span class='text'>Save As</span><i class='hotkey'>Ctrl+Shift+S</i>",
           "event": "saveAs"
           },
           {"name": "<span class='text'>Save All</span><i class='hotkey'>Ctrl+Alt+Shift+S</i>", "event": "saveAll"}*/
        ]
      },
      {
        "name": "Edit",
        "subMenus": [
          {
            "name": "<span class='text'>Undo</span><i class='hotkey'>Ctrl+Z</i>",
            "event": "undo"
          },
          {
            "name": "<span class='text'>Redo</span><i class='hotkey'>Ctrl+Shift+Z</i>",
            "event": "redo"
          }
        ]
      },
      {
        "name": "Find",
        "subMenus": [
          {
            "name": "<span class='text'>Find In File</span><i class='hotkey'>Ctrl+F</i>",
            "event": "findInFile"
          },
          /*{
           "name": "<span class='text'>Find In Folder</span><i class='hotkey'>Ctrl+Shift+F</i>",
           "event": "findInFolder"
           },
           */{
            "name": "<span class='text'>Replace In File</span><i class='hotkey'>Ctrl+R</i>",
            "event": "replaceInFile"
          },
          /*{
           "name": "<span class='text'>Replace In Folder</span><i class='hotkey'>Ctrl+Shift+R</i>",
           "event": "replaceInFolder"
           },*/ {"name": "<span class='text'>GoTo</span><i class='hotkey'>Ctrl+G</i>", "event": "goto"}]
      },
      {
        "name": "Run",
        "subMenus": [
          {
            "name": "<span class='text'>Run index.html</span><i class='hotkey'>Shift+F5</i>",
            "event": "run",
            get model() {
              let node = self.tabs[self.openedFileIndex];
              let opts = self._FileUtils.getFileOptions(node);
              if (opts.fileType == "html") {
                return node;
              }
              return "";
            }
          },
          {
            "name": "<span><i class='fa' data-ng-class=" + "\"" + "{'fa-circle-thin':!subMenu.model,'fa-circle':subMenu.model}" + "\"" + "></i> Auto Run</span>",
            "event": function () {
              this.model = !this.model;
            },
            get model() {
              return self.isEnabledAutoReload
            },
            set model(val) {
              self.isEnabledAutoReload = !!val;
              self._Storage.set("isEnabledAutoReload", self.isEnabledAutoReload)
            }
          }],
      }
    ];

    this._$scope.$watch(()=> {
      return this.currentUser;
    }, (newVal)=> {
      if (newVal) {
        this.previewUrl = AppConstants.PREVIEW + this.currentUser.username + "/" + $stateParams.projectFolder + "/";
        this.iframeUrl = this.previewUrl + '?refreshTime=' + Date.now();
      }
    });

    //// menu bar events
    //file save event
    this._$on("rodin-idea:menu-bar:save", (evt)=> {
      self.saveFile();
    });

    //file run event
    this._$on("rodin-idea:menu-bar:run", (evt, model)=> {
      self.refreshPreview();
    });
  }

  openFile(data) {

    if (this.tabs.length === 1 && this.tabs.first().isBlank && !this.tabs.first().content) {
      this.tabs.splice(0, 1);
    }

    data.index = this.tabs.length;
    data.isUnsaved = false;
    this.tabs.push(data);
    this.updateEditor(data);
  }

  saveFile(...args) {
    let activeTab = self.tabs[self.openedFileIndex];
    let fileContent = self.fileContent;

    if (activeTab) {
      self._Editor.updateFile(self._$scope.projectId, {
        content: fileContent
      }, {
        action: "save",
        filename: activeTab.path
      }).then((data)=> {
        if (activeTab) {
          activeTab.content = fileContent;
          activeTab.isUnsaved = false;
        }

        if (self.isEnabledAutoReload) {
          self.refreshPreview();
        }
      });
    }

  }

  updateEditor(data, isClosedTab = false) {
    const editorMode = self._FileUtils.getFileOptions(data).editorMode;
    let openedTab = self.tabs[self.openedFileIndex];

    if (!isFirstCall && !isClosedTab && openedTab) {
      openedTab.content = self.fileContent;
    }
    isFirstCall = false;

    self.openedFileIndex = data.index;
    self.fileContent = data.content || "";
    self.aceOptions.mode = editorMode;
  }

  treeCallback(action = "", data = {}) {
    switch (action) {
      case "open":
        self.updateEditor(data);
        break;
      case "opennew":
        self.openFile(data);
        break;
    }
  }

  treeChecker(node) {
    const filePath = node.path;
    return self.tabs.filter((item, index)=> {
      return item.path === filePath;
    })[0];
  }

  refreshPreview() {
    this.iframeUrl = this.previewUrl + '?refreshTime=' + Date.now();

    if (this.isEnabledAutoReload && _.size(this.openedWindows)) {
      for (let i in this.openedWindows) {
        let win = this.openedWindows[i];
        if (win.location && _.isFunction(win.location.reload)) {
          win.location.reload();
        } else {
          delete this.openedWindows[i];
        }
      }
    }
  }

  openInNewWindow(url) {
    let win = window.open(url, "_blank");
    let index = (parseInt(Object.keys(this.openedWindows).last()) || 0) + 1; // generate unique indexes
    console.log(Object.keys(this.openedWindows), Object.keys(this.openedWindows).last(), index)
    this.openedWindows[index] = win;
  }

}

export default RIDEACtrl;