import ResizeLink from './link';

function Resize() {
  'ngInject';
  return {
    restrict: 'A',
    link: ResizeLink
  };
}

export default Resize;