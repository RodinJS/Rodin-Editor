import ResizeLink from './link';

function Resize($compile) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      resizeType: '@'
    },
    link: ResizeLink
  };
}

export default Resize;