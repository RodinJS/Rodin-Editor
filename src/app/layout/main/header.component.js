class AppHeaderCtrl {
	constructor(AppConstants, User, $scope, $stateParams, $rootScope) {
		'ngInject';
		this.appName = AppConstants.appName;
		this.SITE = AppConstants.SITE;
		this.currentUser = User.current;
		this._$scope = $scope;
		this._$rootScope = $rootScope;
		this.projectRoot = $stateParams.projectFolder;
		this.logout = ()=> {
			User.logout(...arguments);
		};

	}

	fileSave() {
		this._$rootScope.saveFuckinFile && this._$rootScope.saveFuckinFile('rodin-idea:file-save');
	}
}

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'layout/main/header.html'
};

export default AppHeader;
