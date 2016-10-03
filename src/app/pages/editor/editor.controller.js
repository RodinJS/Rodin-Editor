class EditorCtrl {
	constructor(AppConstants, $stateParams, Project, $state, $scope) {
		'ngInject';

		this.appName = AppConstants.appName;
		this._$stateParams = $stateParams;
		this._Project = Project;
		this._$state = $state;
		this._$scope = $scope;
		this.projectId = null;

		this._Project.get(this._$stateParams.projectFolder).then((data)=> {
			this.project = data;
			this.projectId = data._id;
		}, (errors)=> {
			this._$state.go('app.error');
		});
	}


}

export default EditorCtrl;
