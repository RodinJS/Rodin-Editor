// import RIDEALink from './link';
import RIDEACtrl from './controller';

function RIDEAEditor() {
  'ngInject';

  return {
    restrict: 'EA',
    require: '?ngModel',
    templateUrl: 'components/rodin-IDEA/index.html',
    controllerAs: "$ctrl",
    replace: true,
    controller: RIDEACtrl,
    // link: RIDEALink,
    scope: {
      projectId: "="
    }
  };
}

export default RIDEAEditor;