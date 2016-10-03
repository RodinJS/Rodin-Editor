/**
 * Created by kh.levon98 on 13-Sep-16.
 */

function AppConfig(RestangularProvider, $stateProvider, $locationProvider, $urlRouterProvider, AppConstants) {
	'ngInject';

	RestangularProvider.setBaseUrl(AppConstants[AppConstants.env + "API"]);

	// In this case we are mapping the id of each element to the _id field.
	RestangularProvider.setRestangularFields({
		id: "_id"
	});


	if (AppConstants.env == "prod") {
		$locationProvider.html5Mode(true);
	}


	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'layout/main/app-view.html',
			resolve: {
				auth: function (User) {
					return User.verifyAuth(false);
				}
			}
		});


	$urlRouterProvider.otherwise('/error');

}

export default AppConfig;
