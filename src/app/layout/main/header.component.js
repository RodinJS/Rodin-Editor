class AppHeaderCtrl {
	constructor(AppConstants, User, $scope, $stateParams) {
		'ngInject';
		this.appName = AppConstants.appName;
		this.currentUser = User.current;
		this.projectRoot = $stateParams.projectFolder;
		this.logout = ()=> {
			User.logout(...arguments);
		};

	}
}

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'layout/main/header.html'
};

export default AppHeader;
