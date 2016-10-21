// import TreeLink from './link';
import TreeCtrl from './controller';

function TreeEditor() {
	'ngInject';

	return {
		restrict: 'EA',
		templateUrl: 'components/tree-angular/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: TreeCtrl,
		// link: TreeLink,
		scope: {
			projectId: "=",
			callback: "=",
			checker: "="
		}
	};
}

export default TreeEditor;