/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinTreeFactory(Editor, RodinEditor, RodinTabs, RodinTabsConstants, RodinPreview, $on) {
  'ngInject';

  let model = {};
  let projectId = null;
  let tabsComponentId = RodinTabsConstants.editor;

  model.data = [];

  model.openFile = openFile;
  model.saveFile = saveFile;
  model.createFile = createFile;
  model.createFolder = createFolder;
  model.renameFile = renameFile;
  model.deleteFile = deleteFile;
  model.update = updateTree;

  model.setProjectId = setProjectId;

  $on("menu-bar:saveFile", ()=> {
    saveFile()
  });

  return model;

  function openFile(node) {
    let file = RodinTabs.get(tabsComponentId, node, {"path": node.path});
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

  function saveFile(file = RodinTabs.get(tabsComponentId)) {
    Editor.updateFile(projectId, {
      content: file.content
    }, {
      action: "save",
      filename: file.path
    }).then((data)=> {
      if (file) {
        file.originalContent = file.content;
        file.isUnsaved = false;
        RodinPreview.update();
      }
    });
  }


  function createFile(node, reqData = {}) {
    reqData.type = "file";

    return Editor.createFile(projectId, reqData).then((data)=> {
      model.update(); /// TODO: open created file :: hishem txerqiin asem vor veradarcnen file infon
    });
  }


  function createFolder(node, reqData = {}) {
    reqData.type = "directory";

    return Editor.createFile(projectId, reqData).then((data)=> {
      model.update();
    });
  }


  function renameFile(node, reqData = {}) {

    reqData.filename = node.path;

    return Editor.updateFile(projectId, reqData).then((data)=> {
      model.update();
    });
  }


  function deleteFile(node) {
    return Editor.deleteFile(projectId, {
      filename: node.path
    }).then((data)=> {
      model.update();
    });
  }

  function updateTree(openFile = "") {
    Editor.getProject(projectId).then((data)=> {
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

  /// local variables setter/getter functions

  function setProjectId(id) {
    projectId = id;
    return model.update(["index.js", "index.html"]);
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