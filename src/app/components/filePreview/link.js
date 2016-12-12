/**
 * Created by kh.levon98 on 10-Dec-16.
 */


import angular from 'angular/index';

function FilePreviewLink(scope, elem, attrs, ngModel, transcludeFn, AppConstants, User, FileUtils, $stateParams) {
  let set = angular.extend({}, {
    base: `${AppConstants.PREVIEW}${User.current.username}/${$stateParams.projectFolder}/`,
    type: "text"
  }, scope.config);

  elem.removeClass(( function () {
    let toReturn = '';
    let classes = this.className.split(' ');
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].indexOf("preview-box-file-") === 0) {
        toReturn += classes[i] + ' ';
      }
    }
    return toReturn;
  } ).call(elem[0]));

  if (FileUtils.isImage(scope.file)) {
    initImage();
  }

  function initImage() {
    elem.addClass("preview-box-file-image");
    let img = new Image();

    img.src = set.base + scope.file.path;

    img.onload = function () {
      elem.append(this);
    };
  }


  elem.on('$destroy', () => {
  });

}


export default FilePreviewLink;