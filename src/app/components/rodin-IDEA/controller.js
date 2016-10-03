/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class RIDEACtrl {
	constructor($scope, FileUtils, Editor, AppConstants, User, $stateParams, $sce) {
		'ngInject';
		self = this;

		this._$scope = $scope;
		this._FileUtils = FileUtils;
		this._Editor = Editor;
		this._User = User;
		this._AppConstants = AppConstants;
		this._$sce = $sce;

		this.tabs = [{
			name: "untitled",
			isBlank: true
		}];

		this.currentUser = User.current;
		this.fileContent = '';
		this.openedFileIndex = 0;
		this.iframeUrl = "";

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
				console.log("onLoad")
			},
			onChange: function (_ace) {
				console.log("onChange")
			}
		};

		this._$scope.$watch(()=> {
			return this.currentUser;
		}, (newVal)=> {
			if (newVal) {
				this.previewUrl = AppConstants[AppConstants.env + "Preview"] + this.currentUser.username + "/" + $stateParams.projectFolder;
				this.iframeUrl = this.previewUrl + '?refreshTime=' + Date.now();
			}
		});
	}

	openFile(data) {

		if (this.tabs.length === 1 && this.tabs.first().isBlank && !this.tabs.first().content) {
			this.tabs.splice(0, 1);
		}

		data.index = this.tabs.length;
		this.tabs.push(data);
		this.updateEditor(data);
	}

	saveFile(editor) {
		let activeTab = self.tabs[self.openedFileIndex];
		let fileContent = self.fileContent;

		self._Editor.updateFile(self._$scope.projectId, {
			content: fileContent
		}, {
			action: "save",
			filename: activeTab.path
		}).then((data)=> {
			activeTab.content = fileContent;
		});
	}

	updateEditor(data) {
		const editorMode = self._FileUtils.getFileOptions(data).editorMode;
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
	}

	trustSrc(src) {
		return this._$sce.trustAsResourceUrl(src);
	}

}

export default RIDEACtrl;