/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class ToolbarCtrl {
	constructor(AppConstants) {
		'ngInject';

		this.appName = AppConstants.appName;
		this.SITE = AppConstants.SITE;

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
	}

}

export default ToolbarCtrl;