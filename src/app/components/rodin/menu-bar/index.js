import MenuBarCtrl from './controller';


const MenuBar = {
  templateUrl: 'components/rodin/menu-bar/index.html',
  controller: MenuBarCtrl,
  bindings: {
    menuList: "<"
  }
};

export default MenuBar;