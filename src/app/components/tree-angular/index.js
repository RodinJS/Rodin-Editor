import TreeLink from './link';
import TreeCtrl from './controller';

function TreeEditor() {
	'ngInject';

	return {
		restrict: 'EA',
		require: '?ngModel',
		templateUrl: 'components/tree-angular/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: TreeCtrl,
		link: TreeLink,
		scope:{}
	};
}

export default TreeEditor;