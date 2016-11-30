/**
 * Created by kh.levon98 on 17-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

function RodinTreeFactory(Editor, RodinEditor, RodinTabs, RodinTabsConstants, Utils, File, RodinIdea, RodinPreview) {
  'ngInject';

  let model = {};
  let tabsComponentId = RodinTabsConstants.editor;

  model.data = [];
  model.root = "";

  model.openFile = openFile;
  model.createFile = createFile;
  model.createFolder = createFolder;
  model.uploadFile = uploadFile;
  model.uploadFolder = uploadFolder;
  model.renameFile = renameFile;
  model.deleteFile = deleteFile;
  model.copyFile = copyFile;
  model.copyFolder = copyFolder;
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


  function uploadFile(files = [], reqData = {}) {
    reqData.type = "file";

    return File.upload(files, reqData).then((data)=> {
      model.update();
    });
  }


  function uploadFolder(files = [], reqData = {}) {
    reqData.type = "directory";

    return File.upload(files, reqData).then((data)=> {
      model.update();
    });
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


  function copyFile(node, reqData = {}) {
    reqData.type = "file";

    return File.copy(reqData).then((data)=> {
      model.update();
    });
  }


  function copyFolder(node, reqData = {}) {
    reqData.type = "directory";

    return File.copy(reqData).then((data)=> {
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
      treeIndexing(null, data.tree);

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

  //// local functions

  function treeIndexing(parentId = null, list = []) {
    if (_.isNull(parentId)) {
      list.index = 1;

      if (!_.isEmpty(list.children)) {
        treeIndexing(list.index, list.children);
      }
    } else {
      for (let i = 0, ln = list.length; i < ln; ++i) {
        let index = `${parentId}${i + 1}`;
        let item = list[i];
        item.index = parseInt(index);

        if (!_.isEmpty(item.children)) {
          treeIndexing(index, item.children);
        }
      }
    }
  }
}

export default RodinTreeFactory;