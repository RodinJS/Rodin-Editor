import ProjectsListCtrl from './controller';


function ProjectsList() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'components/rodin/projects-list/index.html',
    controllerAs: "$ctrl",
    replace: true,
    controller: ProjectsListCtrl,
    scope: {}
  };
}

export default ProjectsList;