/**
 * Created by kh.levon98 on 17-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

function RodinTreeFactory(Editor, RodinEditor, RodinTabs, RodinTabsConstants, Utils, FileUtils, File, RodinIdea, RodinPreview, Storage, Modal, $q) {
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
      return File.open(node).then((data) => {
        file = {
          name: node.name,
          path: node.path,
          type: node.type,
          isUnsaved: false,
          isEditable: !FileUtils.isImage(node),
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

    return File.upload(files, reqData).then((data) => {

      if (!_.isEmpty(data.files)) {
        return Modal.replace({
          files: () => {
            return files;
          }
        }).result.then((res) => {
          reqData.action = "replace";
          uploadFile(res.files, reqData);
        });
      }

      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path),
        openFile: _.last(files).name
      });
    });
  }


  function uploadFolder(files = [], reqData = {}) {
    reqData.type = "directory";

    return File.upload(files, reqData).then((data) => {

      if (!_.isEmpty(data.files)) {
        return Modal.replace({
          files: () => {
            return files;
          }
        }).result.then((res) => {
          reqData.action = "replace";
          uploadFile(res.files, reqData);
        });
      }

      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path),
      });
    });
  }


  function createFile(node, reqData = {}) {
    reqData.type = "file";

    return File.create(reqData).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path),
        openFile: reqData.name
      });
    });
  }


  function createFolder(node, reqData = {}) {
    reqData.type = "directory";

    return File.create(reqData).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path)
      });
    });
  }


  function copyFile(node, reqData = {}) {
    reqData.type = "file";

    return File.copy(reqData).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path)
      });
      return $q.resolve(data);
    });
  }


  function copyFolder(node, reqData = {}) {
    reqData.type = "directory";

    return File.copy(reqData).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", reqData.path)
      });
    });
  }


  function renameFile(node, reqData = {}) {
    return File.rename(node, reqData).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", node.parent)
      });
    });
  }


  function deleteFile(node) {

    console.log("fuck", arguments);

    return File.delete(node).then((data) => {
      model.update({
        folderPath: Utils.filterTree(model.data, {active: true}, "path", node.parent)
      });
    });
  }


  function updateTree({
    folderPath = "",
    getAll = false,
    openFile = "",
    runFile = "",
    firstCall = false
  }) {

    let query = {};

    if (getAll) {
      query.getAll = getAll;
    }

    if (folderPath) {
      query.folderPath = folderPath;
    }

    Editor.getProject(RodinIdea.getProjectId(), query).then((data) => {
      if ((_.isEmpty(folderPath) || firstCall) && !_.isArray(data.tree)) {
        model.root = data.root;

        model.data.splice(0, 1, data.tree);

        markActive(model.data);
      } else {
        if (firstCall) {
          model.data.splice(0, 1, data.tree[0]);
        }
        let res = (_.isArray(data.tree) ? data.tree : [data.tree]);
        for (let i = 0, ln = res.length; i < ln; i++) {
          let item = res[i];
          item.active = true;
          Utils.replaceInTree(model.data, item);
        }
      }

      let actionTree = _.isArray(data.tree) ? data.tree.first().children : model.data.first().children;

      if (!_.isEmpty(openFile)) {
        let node;

        if (!_.isArray(openFile)) {
          openFile = [openFile];
        }

        for (let i = 0, ln = openFile.length; i < ln; i++) {
          node = Utils.findFileInTree(actionTree, openFile[i]);
          if (node) {
            model.openFile(node);
            break;
          }
        }
      }

      if (!_.isEmpty(runFile)) {
        let node;

        if (!_.isArray(runFile)) {
          runFile = [runFile];
        }

        for (let i = 0, ln = runFile.length; i < ln; i++) {
          node = Utils.findFileInTree(actionTree, runFile[i]);
          if (node) {
            RodinPreview.run(node);
            break;
          }
        }
      }


    });
  }

  //// local functions

  function markActive(list = [], fromStorage = false, recursive = false) {

    let state = Storage.get("treeState");

    for (let i = 0, ln = list.length; i < ln; i++) {
      let item = list[i];
      let active = true;
      if (fromStorage) {
        active = !!state[item.path];
      } else {
        active = true;
      }

      item.active = active;
      if (recursive && !_.isEmpty(item.children)) {
        markActive(item.children, recursive);
      }
    }
  }

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