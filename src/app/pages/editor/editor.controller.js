class EditorCtrl {
  constructor(AppConstants, $stateParams, Project, $state, $scope, RodinIdea, Socket) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$stateParams = $stateParams;
    this._Project = Project;
    this._$state = $state;
    this._$scope = $scope;
    this._RodinIdea = RodinIdea;
    this._Socket = Socket;
    this.projectId = null;

    this._Project.get(this._$stateParams.projectFolder).then((data)=> {
      this.project = data;

      this._RodinIdea.setProjectId(data._id);

      this.projectId = this._RodinIdea.getProjectId();
    }, (errors)=> {
      this._$state.go('app.error');
    });

    Socket.on('projectTranspiled', (data)=>{
      console.log('pushed', data);
    });

  }


}

export default EditorCtrl;
