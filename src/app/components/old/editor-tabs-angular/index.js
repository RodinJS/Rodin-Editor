// import TabsLink from './link';
import TabsCtrl from './controller';

function EditorTabs() {
  'ngInject';

  return {
    restrict: 'EA',
    templateUrl: 'components/editor-tabs-angular/index.html',
    controllerAs: "$ctrl",
    replace: true,
    controller: TabsCtrl,
    // link: TabsLink,
    scope: {
      openedFileIndex: "=",
      tabs: "=",
      updateEditor: "="
    }
  };
}

export default EditorTabs;