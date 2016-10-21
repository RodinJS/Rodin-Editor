/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinTreeFactory(Editor, RodinEditor, RodinTabs) {
	'ngInject';

	let model = {};
	let projectId = null;
	let tabsComponentId = "editor_tabs";

	model.openFile = openFile;


	model.setTabsComponentId = setTabsComponentId;
	model.setProjectId = setProjectId;

	return model;

	function openFile(node) {
		let file = RodinTabs.get(tabsComponentId, node);
		if (!file) {
			return Editor.getFile(projectId, {
				filename: node.path
			}).then((data)=> {
				file = {
					name: node.name,
					path: node.path,
					type: node.type,
					isUnsaved: false,
					originalContent: data.content,
					content: data.content,
					editor: {
						column: 0,
						row: 0
					}
				};

				RodinEditor.saveState();
				RodinTabs.add(tabsComponentId, file);
				RodinEditor.openFile(RodinTabs.get(tabsComponentId));
			});
		}

		RodinEditor.openFile(file);
	}

	/// local variables setter/getter functions
	function setTabsComponentId(id) {
		tabsComponentId = id;
	}

	function setProjectId(id) {
		projectId = id;
	}
}

export default RodinTreeFactory;