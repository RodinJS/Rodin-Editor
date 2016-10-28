class EditorCtrl {
  constructor(AppConstants, $stateParams, Project, $state, $scope, RodinIdea) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$stateParams = $stateParams;
    this._Project = Project;
    this._$state = $state;
    this._$scope = $scope;
    this._RodinIdea = RodinIdea;
    this.projectId = null;

    this._Project.get(this._$stateParams.projectFolder).then((data)=> {
      this.project = data;

      this._RodinIdea.setProjectId(data._id);

      this.projectId = this._RodinIdea.getProjectId();
    }, (errors)=> {
      this._$state.go('app.error');
    });
  }


}

export default EditorCtrl;
