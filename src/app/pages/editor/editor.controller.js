class EditorCtrl {
	constructor(AppConstants, $stateParams) {
		'ngInject';

		this.appName = AppConstants.appName;
		this._$stateParams = $stateParams;

		this.projectId = this._$stateParams.projectId || null;
	}


}

export default EditorCtrl;
