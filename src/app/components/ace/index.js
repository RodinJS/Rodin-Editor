import ace from "ace/ace";
import AceLink from './link';
import AceCtrl from './controller';


function AceEditor() {
  'ngInject';
  if (angular.isUndefined(ace)) {
    throw new Error('ace directive need ace library to work...');
  }

  return {
    restrict: 'E',
    require: '?ngModel',
    replace: true,
    link: AceLink,
    controller: AceCtrl,
    scope: {
      aceConfig: "="
    }
  };
}

export default AceEditor;