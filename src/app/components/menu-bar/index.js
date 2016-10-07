// import TreeLink from './link';
import MenuBarCtrl from './controller';

function MenuBar() {
	'ngInject';

	return {
		restrict: 'EA',
		templateUrl: 'components/menu-bar/index.html',
		controllerAs: "$ctrl",
		replace: true,
		controller: MenuBarCtrl,
		// link: MenuBarLink,
		scope: {
			menuList:"="
		}
	};
}

export default MenuBar;