import ResizeLink from './resize.link';
import ResizeItemLink from './resizeItem.link';

function Resize() {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      resizeType: '@'
    },
    link: ResizeLink
  };
}

function ResizeItem() {
  'ngInject';
  return {
    restrict: 'A',
    require: "?^resize",
    link: ResizeItemLink
  };
}

export {Resize, ResizeItem};