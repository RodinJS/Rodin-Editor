/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class RIDEACtrl {
	constructor($scope, FileUtils) {
		'ngInject';

		this._$scope = $scope;
		this._FileUtils = FileUtils;

		self = this;

		this.projectId = this._$scope.projectId || null;

		this.tabs = [{
			name: "untitled",
			isBlank: true
		}];

		this.fileContent = '';
		this.openedFileIndex = 0;

		this.aceOptions = {
			workerPath: "/scripts/vendor/ace/lib/ace",
			theme: 'monokai',
			mode: 'javascript',
			showGutter: true,
			// cursorPosition: 0,
			advanced: {
				basePath: "/scripts/vendor/ace/lib/",
				fontSize: "12px",
				tabSize: 4,
				wrap: true,
				readOnly: false,
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				autoScrollEditorIntoView: true,
			},
			onLoad: function (_ace) {
				console.log("onLoad")
			},
			onChange: function (_ace) {
				console.log("onChange")
			}
		};
	}

	openFile(data) {

		if (this.tabs.length === 1 && this.tabs.first().isBlank && !this.tabs.first().content) {
			this.tabs.splice(0, 1);
		}

		data.index = this.tabs.length;
		this.tabs.push(data);
		this.updateEditor(data);
	}

	updateEditor(data) {
		const editorMode = self._FileUtils.getFileOptions(data).editorMode;

		this.openedFileIndex = data.index;
		self.fileContent = data.content;
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


}

export default RIDEACtrl;