import FilePreviewLink from './link';


function FilePreview(FileUtils, AppConstants, User, $stateParams) {
  'ngInject';
  return {
    restrict: 'A',
    replace: false,
    link: function () {
      FilePreviewLink.apply(this, [...arguments, AppConstants, User, FileUtils, $stateParams]);
    },
    scope: {
      file: "=filePreview",
      config: "=configPreview"
    }
  };
}

export default FilePreview;