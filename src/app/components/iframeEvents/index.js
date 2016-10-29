import IframeEventsLink from './link';

function IframeEvents($compile, $window) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      resizeType: '@'
    },
    link: IframeEventsLink
  };
}

export default IframeEvents;