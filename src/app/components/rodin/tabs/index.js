import TabsCtrl from './controller';


let Tabs = {
  templateUrl: 'components/rodin/tabs/index.html',
  controller: TabsCtrl,
  bindings: {
    componentId: "@",
    saveState: "<",
    callbacks: "<"
  }
};

export default Tabs;