/**
 * Created by kh.levon98 on 28-Oct-16.
 */
class File {
  constructor(Editor) {
    'ngInject';

    this._Editor = Editor;

  }


  open(projectId = null, file = null) {
    if (!projectId || !file) {
      throw new Error("Please provide `projectId` and `file`");
      return false;
    }

    return this._Editor.getFile(projectId, {
      filename: file.path
    });
  }

  save(projectId = null, file = null) {

    if (!projectId || !file) {
      throw new Error("Please provide `projectId` and `file`");
      return false;
    }

    return this._Editor.updateFile(projectId, {
      content: file.content
    }, {
      action: "save",
      filename: file.path
    });
  }


  create(projectId = null, reqData = {}) {
    if (!projectId) {
      throw new Error("Please provide `projectId`");
      return false;
    }

    return this._Editor.createFile(projectId, reqData);
  }


  rename(projectId = null, file = null, reqData = {}) {
    if (!projectId) {
      throw new Error("Please provide `projectId` and `file`");
      return false;
    }

    reqData.filename = file.path;

    return this._Editor.updateFile(projectId, reqData);
  }


  delete(projectId = null, file = null) {
    if (!projectId) {
      throw new Error("Please provide `projectId` and `file`");
      return false;
    }

    return this._Editor.deleteFile(projectId, {
      filename: file.path
    });
  }

}

export default File;