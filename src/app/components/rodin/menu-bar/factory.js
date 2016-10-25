/**
 * Created by kh.levon98 on 17-Oct-16.
 */


import * as _ from "lodash/dist/lodash.min";
import angular from 'angular/index';


function RodinMenuBarFactory(Utils) {
  'ngInject';

  let model = {};

  const defaultTemplate = "<span class='text'>{{::name}}</span><i class='hotkey' data-ng-show='hotkey'>{{::hotkey}}</i>";

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
        "openFile": {
          "id": "openFile",
          "name": "Open File",
          "hotKey": Utils.bindKey("Ctrl-O", "Command-O"),
          "template": defaultTemplate,
        },
        "openFolder": {
          "id": "openFolder",
          "name": "Open Folder",
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
          "name": "Run {{model}}",
          "hotKey": Utils.bindKey("Shift-R", "Shift-R"),
          "template": "<span class='text' data-compile='name'></span><i class='hotkey' data-ng-show='hotkey'>{{::hotkey}}</i>",
          get model() {/*
           let node = self.tabs[self.openedFileIndex];
           let opts = self._FileUtils.getFileOptions(node);
           if (opts.fileType == "html") {
           return node;
           }*/
            return "";
          }
        },
        "autoRun": {
          "id": "autoRun",
          "name": "Auto Run",
          "template": "<span><i class='fa' data-ng-class=" + "\"" + "{'fa-circle-thin':!model,'fa-circle':model}" + "\"" + "></i> {{::name}}</span>",
          "event": function () {
            this.model = !this.model;
          },
          get model() {
            // return self.isEnabledAutoReload
            return false;
          },
          set model(val) {
            /*self.isEnabledAutoReload = !!val;
             self._Storage.set("isEnabledAutoReload", self.isEnabledAutoReload)*/
          }
        }
      },
    }
  ];

  model.drawNode = drawNode;
  model.getList = function () {
    return menuList;
  };


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

    let scope = {
      name: renderNode.name,
      hotKey: renderNode.hotKey,
      model: renderNode.model
    };

    return {
      template: renderNode.template,
      scope: scope
    };
  }

}


export default RodinMenuBarFactory;