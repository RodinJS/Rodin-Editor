/**
 * Created by kh.levon98 on 06-Oct-16.
 */
let self;

class TreeCtrl {
	constructor(AppConstants, User, $scope, $stateParams, $rootScope, $timeout, $log, $on, $emit) {
		'ngInject';
		self = this;
		this.appName = AppConstants.appName;
		this.SITE = AppConstants.SITE;
		this.currentUser = User.current;
		this._$scope = $scope;
		this._$rootScope = $rootScope;
		this.projectRoot = $stateParams.projectFolder;
		this.logout = ()=> {
			User.logout(...arguments);
		};

		this._$timeout = $timeout;
		this._$log = $log;
		this._$on = $on;
		this._$emit = $emit;

		this.menuList = this._$scope.menuList;
	}

	selectOption(eventName) {
		this._$emit("rodin-idea:menu-bar:" + eventName);
	}
}

export default TreeCtrl;

