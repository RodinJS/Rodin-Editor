import ace from "ace/ace";
import AceLink from './link';
import AceCtrl from './controller';


function AceEditor() {
	'ngInject';
	if (angular.isUndefined(ace)) {
		throw new Error('ui-ace need ace to work... (o rly?)');
	}

	return {
		restrict: 'EA',
		require: '?ngModel',
		controllerAs: "$ctrl",
		replace: true,
		controller: AceCtrl,
		link: AceLink,
		scope: {
			aceConfig: "="
		}
	};
}

export default AceEditor;