/**
 * Created by kh.levon98 on 17-Oct-16.
 */


import * as _ from "lodash/dist/lodash.min";
import * as AceThems from 'ace/ext/themelist';
import angular from 'angular/index';


function RodinMenuBarFactory(Utils, HotKeyFilter, RodinPreview, RodinIdea, RodinTabs, RodinEditor, FileUtils, RodinTabsConstants, Storage) {
  'ngInject';


  let model = {};
  let editorTabsComponentId = RodinTabsConstants.editor;

  const defaultTemplate = "<span class='text'>{{::name}}</span><i class='hotkey' data-ng-show='hotKey' data-ng-bind-html='::hotKey'></i>";
  const defaultTemplateWithSubMenu = "<span class='text'>{{::name}}</span><i class='fa fa-caret-right'></i>";
  const radioTemplate = "<span><i class='fa fa-check' data-ng-class=" + "\"" + "{'invisible':!compileScope.model}" + "\"" + "></i> {{::name}}</span>";

  const themesMenu = {
    id: "theme",
    name: "Theme",
    template: defaultTemplateWithSubMenu,
    subMenus: {
      light: {
        id: "theme_light",
        name: "Light",
        template: defaultTemplateWithSubMenu,
        subMenus: {
          test: {
            id: "adasd",
            name: "asdasdasd",
            template: defaultTemplateWithSubMenu
          }
        }
      },
      dark: {
        id: "theme_dark",
        name: "Dark",
        template: defaultTemplateWithSubMenu,
        subMenus: {}
      }
    }
  };

  for (let i in AceThems.themesByName) {
    let theme = AceThems.themesByName[i];
    const themeType = theme.isDark ? "dark" : "light";
    themesMenu.subMenus[themeType][theme.name] = {
      id: `${theme.name}`,
      name: theme.caption,
      template: radioTemplate,
      get model() {
        return this.id === Storage.get('theme');
      },
      event: function (evt) {
        evt.stopPropagation();

        Storage.set('theme', this.id);
      }
    }
  }

  const menuList = [
    {
      "index": 0,
      "name": "File",
      "subMenus": {
        "newFile": {
          "id": "newFile",
          "name": "New File",
          "hotKey": Utils.bindKey("Ctrl-N", "Command-N"),
          "template": defaultTemplate,
        },
        "newFolder": {
          "id": "newFolder",
          "name": "New Folder",
          "hotKey": Utils.bindKey("Ctrl-Shift-N", "Command-Shift-N"),
          "template": defaultTemplate,
        },
        "uploadFile": {
          "id": "uploadFile",
          "name": "Upload File",
          "hotKey": Utils.bindKey("Ctrl-O", "Command-O"),
          "template": defaultTemplate,
        },
        "uploadFolder": {
          "id": "uploadFolder",
          "name": "Upload Folder",
          "hotKey": Utils.bindKey("Ctrl-Shift-O", "Command-Shift-O"),
          "template": defaultTemplate,
        },
        "saveFile": {
          "id": "saveFile",
          "name": "Save",
          "hotKey": Utils.bindKey("Ctrl-S", "Command-S"),
          "template": defaultTemplate,
        },
        "copyFile": {
          "id": "copyFile",
          "name": "Save As",
          "hotKey": Utils.bindKey("Ctrl-Shift-S", "Command-Shift-S"),
          "template": defaultTemplate,
        },
        "saveAllFiles": {
          "id": "saveAllFiles",
          "name": "Save All",
          "hotKey": Utils.bindKey("Ctrl-Alt-Shift-S", "Command-Alt-Shift-S"),
          "template": defaultTemplate,
        }
      }
    },
    {
      "index": 1,
      "name": "Edit",
      "subMenus": {
        "undo": {
          "id": "undo",
          "name": "Undo",
          "hotKey": Utils.bindKey("Ctrl-Z", "Command-Z"),
          "template": defaultTemplate,
        },
        "redo": {
          "id": "redo",
          "name": "Redo",
          "hotKey": Utils.bindKey("Ctrl-Shift-Z", "Command-Shift-Z"),
          "template": defaultTemplate,
        }
      }
    },
    {
      "index": 2,
      "name": "Find",
      "subMenus": {
        "findInFile": {
          "id": "findInFile",
          "name": "Find In File",
          "hotKey": Utils.bindKey("Ctrl-F", "Command-F"),
          "template": defaultTemplate,
        },
        "findInFolder": {
          "id": "findInFolder",
          "name": "Find In Folder",
          "hotKey": Utils.bindKey("Ctrl-Shift-F", "Command-Shift-F"),
          "template": defaultTemplate,
        },
        "replaceInFile": {
          "id": "replaceInFile",
          "name": "Replace In File",
          "hotKey": Utils.bindKey("Ctrl-R", "Command-R"),
          "template": defaultTemplate,
        },
        "replaceInFolder": {
          "id": "replaceInFolder",
          "name": "Replace In Folder",
          "hotKey": Utils.bindKey("Ctrl-Shift-R", "Command-Shift-R"),
          "template": defaultTemplate,
        },
        "goToLine": {
          "id": "goToLine",
          "name": "GoTo",
          "hotKey": Utils.bindKey("Ctrl-G", "Command-G"),
          "template": defaultTemplate,
        }
      }
    },
    {
      "index": 3,
      "name": "Run",
      "subMenus": {
        "run": {
          "id": "run",
          "name": "Run {{compileScope.model.name}}",
          "hotKey": Utils.bindKey("Shift-R", "Shift-R"),
          "template": "<span class='text' data-compile='name' data-compile-scope='compileScope'></span><i class='hotkey' data-ng-show='hotKey' data-ng-bind-html='::hotKey'></i>",
          get model() {
            let openFile = RodinTabs.get(editorTabsComponentId);
            let opts = FileUtils.getFileOptions(openFile);
            if (opts.fileType === "html") {
              return openFile;
            }
            return {};
          }
        },
        "autoRun": {
          "id": "autoRun",
          "name": "Auto Run",
          "template": radioTemplate,
          "event": function () {
            this.model = !this.model;
          },
          get model() {
            return RodinPreview.autoReload;
          },
          set model(val) {
            return RodinPreview.setAutoReload(val);
          }
        }
      },
    },
    {
      "index": 4,
      "name": "Window",
      "subMenus": {
        "tree": {
          "id": "window_tree",
          "name": "Tree",
          "template": radioTemplate,
          "event": function () {
            this.model = !this.model
          },
          get model() {
            return RodinIdea.windowActivity.tree;
          },
          set model(val) {
            return RodinIdea.setWindowActivity('tree', val);
          }
        },
        "preview": {
          "id": "window_preview",
          "name": "Preview",
          "template": radioTemplate,
          "event": function () {
            this.model = !this.model
          },
          get model() {
            return RodinIdea.windowActivity.preview;
          },
          set model(val) {
            return RodinIdea.setWindowActivity('preview', val);
          }
        },
        // "inspector": {
        //   "id": "window_inspector",
        //   "name": "3D Inspector",
        //   "template": radioTemplate,
        //   "event": function () {
        //     this.model = !this.model
        //   },
        //   get model() {
        //     return RodinIdea.windowActivity.inspector;
        //   },
        //   set model(val) {
        //     return RodinIdea.setWindowActivity('inspector', val);
        //   }
        // },
        // "monitor": {
        //   "id": "window_monitor",
        //   "name": "Performance Monitoring",
        //   "template": radioTemplate,
        //   "event": function () {
        //     this.model = !this.model
        //   },
        //   get model() {
        //     return RodinIdea.windowActivity.monitor;
        //   },
        //   set model(val) {
        //     return RodinIdea.setWindowActivity('monitor', val);
        //   }
        // }
        "theme": themesMenu
      }
    }
  ];

  model.drawNode = drawNode;
  model.getList = getList;


  return model;

  function drawNode(renderNode, menuIndex, ...hierarchy) {
    /*
     let menu = menuList[menuIndex];

     if (menu && _.isArray(hierarchy) && hierarchy.length) {
     let node = menu;
     for (let i = 0, ln = hierarchy.length; i < ln; ++i) {
     let id = hierarchy[i];
     if ((_.isObject(node) || _.isArray(node)) && _.isObject(node.subMenus)) {
     node = node.subMenus[id];
     }
     }

     let NODE = angular.merge({}, renderNode, node);
     */

    let scope = angular.extend(renderNode, {
      hotKey: HotKeyFilter(renderNode.hotKey),
    });

    return {
      template: renderNode.template,
      scope: scope
    };
  }

  function getList() {
    return menuList;
  }
}


export default RodinMenuBarFactory;