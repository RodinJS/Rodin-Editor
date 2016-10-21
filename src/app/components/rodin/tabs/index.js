import TabsCtrl from './controller';


let Tabs = {
	templateUrl: 'components/rodin/tabs/index.html',
	controller: TabsCtrl,
	bindings: {
		componentId: "@",
		callbacks: "<"
	}
};

export default Tabs;