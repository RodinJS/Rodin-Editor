class AppHeaderCtrl {
	constructor(AppConstants, User, $scope) {
		'ngInject';
		this.appName = AppConstants.appName;
		this.currentUser = User.current;
		this.logout = ()=> {
			User.logout(...arguments);
		};

		$scope.$watch('User.current', (newUser) => {
			this.currentUser = newUser;
		})
	}
}

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'layout/main/header.html'
};

export default AppHeader;
