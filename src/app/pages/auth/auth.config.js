function AuthConfig($stateProvider) {
	'ngInject';

	$stateProvider

		.state('app.login', {
			url: '/login',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Sign in',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(false);
				}
			}
		})

		.state('app.register', {
			url: '/register',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Sign up',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(false);
				}
			}
		})

		.state('app.forgot', {
			url: '/forgot',
			controller: 'AuthCtrl as $ctrl',
			templateUrl: 'pages/auth/auth.html',
			title: 'Forgot Password',
			resolve: {
				auth: function (User) {
					return User.ensureAuthIs(false);
				}
			}
		});

};

export default AuthConfig;
