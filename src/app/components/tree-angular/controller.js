/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class TreeCtrl {
	constructor($scope, $timeout, Editor) {
		'ngInject';

		this._$scope = $scope;
		this._$timeout = $timeout;
		this._Editor = Editor;

		this.data = [];

		window.ce = this._$scope

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
		this._Editor.getProject().then((data)=> {
			this.data.splice(0, 1, data.tree);

			const tim = this._$timeout(()=> {
				this._$scope.$broadcast('angular-ui-tree:expand-all');
				this._$timeout.cancel(tim);
			}, 1000);
		});
	}

}

export default TreeCtrl;

