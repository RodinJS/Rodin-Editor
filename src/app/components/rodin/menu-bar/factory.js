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
					"hotKey": Utils.bindKey("Ctrl+N", "Cmd+N"),
					"template": defaultTemplate,
				},
				"newFolder": {
					"id": "newFolder",
					"name": "New Folder",
					"hotKey": Utils.bindKey("Ctrl+Shift+N", "Cmd+Shift+N"),
					"template": defaultTemplate,
				},
				"openFile": {
					"id": "openFile",
					"name": "Open File",
					"hotKey": Utils.bindKey("Ctrl+O", "Cmd+O"),
					"template": defaultTemplate,
				},
				"openFolder": {
					"id": "openFolder",
					"name": "Open Folder",
					"hotKey": Utils.bindKey("Ctrl+Shift+O", "Cmd+Shift+O"),
					"template": defaultTemplate,
				},
				"saveFile": {
					"id": "saveFile",
					"name": "Save",
					"hotKey": Utils.bindKey("Ctrl+S", "Cmd+S"),
					"template": defaultTemplate,
				},
				"copyFile": {
					"id": "copyFile",
					"name": "Save As",
					"hotKey": Utils.bindKey("Ctrl+Shift+S", "Cmd+Shift+S"),
					"template": defaultTemplate,
				},
				"saveAllFiles": {
					"id": "saveAllFiles",
					"name": "Save All",
					"hotKey": Utils.bindKey("Ctrl+Alt+Shift+S", "Cmd+Alt+Shift+S"),
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
					"hotKey": Utils.bindKey("Ctrl+Z", "Cmd+Z"),
					"template": defaultTemplate,
				},
				"redo": {
					"id": "redo",
					"name": "Redo",
					"hotKey": Utils.bindKey("Ctrl+Shift+Z", "Cmd+Shift+Z"),
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
					"hotKey": Utils.bindKey("Ctrl+F", "Cmd+F"),
					"template": defaultTemplate,
				},
				"findInFolder": {
					"id": "findInFolder",
					"name": "Find In Folder",
					"hotKey": Utils.bindKey("Ctrl+Shift+F", "Cmd+Shift+F"),
					"template": defaultTemplate,
				},


				"replaceInFile": {
					"id": "replaceInFile",
					"name": "Replace In File",
					"hotKey": Utils.bindKey("Ctrl+R", "Cmd+R"),
					"template": defaultTemplate,
				},
				"replaceInFolder": {
					"id": "replaceInFolder",
					"name": "Replace In Folder",
					"hotKey": Utils.bindKey("Ctrl+Shift+R", "Cmd+Shift+R"),
					"template": defaultTemplate,
				},
				"goToLine": {
					"id": "goToLine",
					"name": "GoTo",
					"hotKey": Utils.bindKey("Ctrl+G", "Cmd+G"),
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
					"hotKey": Utils.bindKey("Shift+R", "Shift+R"),
					"template": defaultTemplate,
					get model() {
						let node = self.tabs[self.openedFileIndex];
						let opts = self._FileUtils.getFileOptions(node);
						if (opts.fileType == "html") {
							return node;
						}
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
						return self.isEnabledAutoReload
					},
					set model(val) {
						self.isEnabledAutoReload = !!val;
						self._Storage.set("isEnabledAutoReload", self.isEnabledAutoReload)
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

			let scope = {
				name: NODE.name,
				hotKey: NODE.hotKey,
				model: NODE.model
			};

			return {
				template: NODE.template,
				scope: scope
			};
		}

	}
}

export default RodinMenuBarFactory;