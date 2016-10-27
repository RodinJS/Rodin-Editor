import IdeaCtrl from './controller';

function Idea() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'components/rodin/idea/index.html',
    controllerAs: "$ctrl",
    replace: true,
    controller: IdeaCtrl,
    scope: {
      projectId: "="
    }
  };
}

export default Idea;