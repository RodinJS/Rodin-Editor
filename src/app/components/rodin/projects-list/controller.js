/**
 * Created by kh.levon98 on 24-Sep-16.
 */
class ProjectsListCtrl {
  constructor(AppConstants, $scope, $stateParams, Project, $window, User) {
    'ngInject';
    this._AppConstants = AppConstants;
    this.appName = AppConstants.appName;
    this.SITE = AppConstants.SITE;
    this.EDITOR = AppConstants.EDITOR;
    this._$scope = $scope;
    this._$window = $window;
    this._Project = Project;
    this._User = User;

    this.projectRoot = $stateParams.projectFolder;

    this._Project.getList().then((data) => {
      this.projectList = data;
    })
  }

  changeProject(root) {

    if (this.projectRoot === root) {
      return false;
    }

    this._$window.location.href = `${this.EDITOR}${this._User.current.username}/${root}`;

    if (this._AppConstants.env === "local") {
      this._$window.location.reload();
    }
  }

}

export default ProjectsListCtrl;