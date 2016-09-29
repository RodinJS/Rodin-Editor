class EditorCtrl {
	constructor(AppConstants, $stateParams) {
		'ngInject';

		this.appName = AppConstants.appName;
		this._$stateParams = $stateParams;
	}


}

export default EditorCtrl;
