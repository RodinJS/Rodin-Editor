import PreviewCtrl from './controller';


function Preview() {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'components/rodin/preview/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: PreviewCtrl,
		scope: {}
	};
}

export default Preview;