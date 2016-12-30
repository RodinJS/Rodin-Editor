import LoaderLink from './link';


function LoaderEditor() {
  'ngInject';

  return {
    restrict: 'A',
    replace: false,
    controller: function ($scope, Loader) {
      'ngInject';

      $scope._Loader = Loader;
    },
    link: LoaderLink,
  };
}

export default LoaderEditor;