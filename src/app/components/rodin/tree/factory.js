/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinTreeFactory(Editor, RodinEditor, RodinTabs, RodinTabsConstants, Utils, File, RodinIdea, RodinPreview) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.editor;

  model.data = [];
  model.root = "";

  model.openFile = openFile;
  model.createFile = createFile;
  model.createFolder = createFolder;
  model.renameFile = renameFile;
  model.deleteFile = deleteFile;
  model.update = updateTree;

  return model;

  function openFile(node) {
    let file = RodinTabs.get(tabsComponentId, node, {"path": node.path});
    if (!file) {
      return File.open(node).then((data)=> {
        file = {
          name: node.name,
          path: node.path,
          type: node.type,
          isUnsaved: false,
          originalContent: data.content,
          content: data.content
        };

        RodinEditor.saveState();
        RodinTabs.add(tabsComponentId, file);
        RodinEditor.openFile(RodinTabs.get(tabsComponentId));
      });
    }

    RodinEditor.saveState();
    RodinTabs.setActive(tabsComponentId, file);
    RodinEditor.openFile(file);
  }

  function createFile(node, reqData = {}) {
    reqData.type = "file";

    return File.create(reqData).then((data)=> {
      model.update();
      model.openFile({
        name: reqData.name,
        path: `${reqData.path}/${reqData.name}`,
        type: reqData.type
      })
    });
  }


  function createFolder(node, reqData = {}) {
    reqData.type = "directory";

    return File.create(reqData).then((data)=> {
      model.update();
    });
  }


  function renameFile(node, reqData = {}) {
    return File.rename(node, reqData).then((data)=> {
      model.update();
    });
  }


  function deleteFile(node) {
    return File.delete(node).then((data)=> {
      model.update();
    });
  }

  function updateTree(openFile = "") {
    Editor.getProject(RodinIdea.getProjectId()).then((data)=> {

      model.root = data.root;

      model.data.splice(0, 1, data.tree);

      if (!_.isEmpty(openFile)) {
        let node;

        if (!_.isArray(openFile)) {
          openFile = [openFile];
        }

        for (let i = 0, ln = openFile.length; i < ln; i++) {
          node = Utils.findFileInTree(data.tree.children, openFile[i]);
          if (node) {
            model.openFile(node);
            break;
          }
        }
      }


      //// TODO: fuckin logic remove this
      let node;
      for (let i = 0, openFile = ["index.html", ".html"], ln = openFile.length; i < ln; i++) {
        node = Utils.findFileInTree(data.tree.children, openFile[i]);
        if (node) {
          RodinPreview.run(node);
          break;
        }
      }

    });
  }
}

export default RodinTreeFactory;