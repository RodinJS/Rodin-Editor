import ResizeLink from './link';

function Resize($compile) {
	'ngInject';
	return {
		restrict: 'A',
		link: ResizeLink
	};
}

export default Resize;