function ErrorConfig($stateProvider) {
	'ngInject';

	$stateProvider
		.state('app.error', {
			url: '/error',
			controller: 'ErrorCtrl',
			controllerAs: '$ctrl',
			template: '',
			title: 'Error',
			pageClass: "page-404",
		});
}

export default ErrorConfig;
