import EditorCtrl from './controller';


function Editor() {
	'ngInject';

	return {
		restrict: 'E',
		templateUrl: 'components/rodin/editor/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: EditorCtrl,
		scope: {}
	};
}

export default Editor;