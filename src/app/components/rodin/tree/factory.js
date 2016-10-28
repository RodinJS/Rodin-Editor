/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinTreeFactory(Editor, RodinEditor, RodinTabs, RodinTabsConstants, RodinPreview, $on, File, RodinIdea) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.editor;

  model.data = [];

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
      model.update(); /// TODO: open created file :: hishem txerqiin asem vor veradarcnen file infon

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
      model.data.splice(0, 1, data.tree);

      if (!_.isEmpty(openFile)) {
        let node;

        if (!_.isArray(openFile)) {
          openFile = [openFile];
        }

        for (let i = 0, ln = openFile.length; i < ln; i++) {
          node = findFileInTree(data.tree.children, openFile[i]);
          if (node) {
            model.openFile(node);
            break;
          }
        }
      }

    });
  }

  // local functions
  function findFileInTree(list = [], name = "") {
    for (let i = 0, ln = list.length; i < ln; ++i) {
      if (list[i].name.indexOf(name) > -1) {
        return list[i];
      }
    }

    return false;
  }
}

export default RodinTreeFactory;