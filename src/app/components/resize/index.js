import ResizeLink from './resize.link';
import ResizeCtrl from './resize.controller';
import ResizeItemLink from './resizeItem.link';

function Resize() {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      resizeType: '@'
    },
    link: ResizeLink,
    controller: ResizeCtrl
  };
}

function ResizeItem() {
  'ngInject';
  return {
    restrict: 'A',
    require: "^^resize",
    link: ResizeItemLink
  };
}

export {Resize, ResizeItem};