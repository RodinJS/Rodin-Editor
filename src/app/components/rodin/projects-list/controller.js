/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class ProjectsListCtrl {
  constructor(AppConstants, $scope, $stateParams, Project) {
    'ngInject';
    this.appName = AppConstants.appName;
    this.SITE = AppConstants.SITE;
    this._$scope = $scope;
    this._Project = Project;

    this.projectRoot = $stateParams.projectFolder;

    this._Project.getList().then((data)=> {
      this.projectList = data;
    })
  }

}

export default ProjectsListCtrl;