import InfoBarCtrl from './controller';


function InfoBar() {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'components/rodin/info-bar/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: InfoBarCtrl,
		scope: {}
	};
}

export default InfoBar;