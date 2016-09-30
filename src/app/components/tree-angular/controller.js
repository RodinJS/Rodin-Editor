/**
 * Created by kh.levon98 on 24-Sep-16.
 */

class TreeCtrl {
	constructor($scope, $timeout, Editor, $log, FileUtils) {
		'ngInject';

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
}

export default TreeCtrl;

