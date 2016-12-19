// import ToolbarLink from './link';
import ToolbarCtrl from './controller';


function Toolbar() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'components/rodin/toolbar/index.html',
    controllerAs: "$ctrl",
    replace: true,
    controller: ToolbarCtrl,
    // link: ToolbarLink,
    scope: {}
  };
}

export default Toolbar;