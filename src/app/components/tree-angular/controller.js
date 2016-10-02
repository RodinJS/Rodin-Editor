/**
 * Created by kh.levon98 on 24-Sep-16.
 */
let self;

class TreeCtrl {
	constructor($scope, $timeout, Editor, $log, FileUtils) {
		'ngInject';
		self = this;
		this._$scope = $scope;
		this._$timeout = $timeout;
		this._Editor = Editor;
		this._FileUtils = FileUtils;
		this._$log = $log;

		this.projectId = this._$scope.projectId || null;
		this.callbackFn = this._$scope.callback;
		this.checkerFn = this._$scope.checker;

		if (!_.isFunction(this.callbackFn) || !_.isFunction(this.callbackFn)) {
			return this._$log.error("`callback` and/or `checker` functions is required!");
		}

		this.data = [];

		this.fileMenuOptions = [
			['Rename...', this._rename],
			['Delete File', this._delete]
		];

		this.directoryMenuOptions = [
			['New File', this._createFile],
			['Rename...', this._rename],
			null,
			['New Folder', this._createFolder],
			['Delete Folder', this._delete],
			// ['Find in Folder', this._findInFolder]
		];

		/// Get project tree
		this.updateTree();
	}

	remove(scope) {
		scope.remove();
	}

	toggle(scope) {
		scope.toggle();
	};

	updateTree() {
		this._Editor.getProject(this.projectId).then((data)=> {
			this.data.splice(0, 1, data.tree);
		});
	}

	open(scope = {}, node = {}) {
		if (node.type == "directory") {
			return this.toggle(scope);
		} else {
			let openedTab = this.checkerFn(node);
			if (openedTab) {
				this.callbackFn("open", openedTab);
			} else {
				this._Editor.getFile(this.projectId, {
					filename: node.path
				}).then((data)=> {
					const file = {
						name: node.name,
						path: node.path,
						type: node.type,
						content: data.content
					};

					this.callbackFn("opennew", file);
				});
			}
		}
	}

	getFileOptions(...args) {
		return this._FileUtils.getFileOptions(...args);
	}

	isFolder(node) {
		return (node.type == 'directory');
	}

	_delete($itemScope, $event, node, text, $li) {
		let ans = confirm("Are you sure delete file: " + node.name);

		if (ans) {
			self._Editor.deleteFile(this.projectId, {
				filename: node.path
			}).then((data)=> {
				self.updateTree();
			}, (errors)=> {
				alert("Error delete file!");
			})
		}
	}

	_rename($itemScope, $event, node, text, $li) {
		let name = prompt("Change file name.", node.name);

		if (name) {
			self._Editor.updateFile(this.projectId, {
				action: "rename",
				filename: node.path,
				newName: name,
			}).then((data)=> {
				self.updateTree();
			}, (errors)=> {
				alert("Error rename file!");
			})
		}
	}

	_createFolder($itemScope, $event, node, text, $li) {
		let name = prompt("Folder name.");

		if (name) {
			self._Editor.createFile(this.projectId, {
				type: "folder",
				path: node.path,
				name: name,
			}).then((data)=> {
				self.updateTree();
			}, (errors)=> {
				alert("Error to create folder!");
			})
		}
	}

	_createFile($itemScope, $event, node, text, $li) {
		let name = prompt("File name.");

		if (name) {
			self._Editor.createFile(this.projectId, {
				type: "file",
				path: node.path,
				name: name,
			}).then((data)=> {
				self.updateTree();
			}, (errors)=> {
				alert("Error to create file!");
			})
		}
	}
}

export default TreeCtrl;

