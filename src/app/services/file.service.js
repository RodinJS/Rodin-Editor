/**
 * Created by kh.levon98 on 28-Oct-16.
 */
class File {
  constructor(Editor, RodinIdea, RodinPreview) {
    'ngInject';

    this._Editor = Editor;
    this._RodinIdea = RodinIdea;
    this._RodinPreview = RodinPreview;

  }


  open(file = null) {
    if (!file) {
      throw new Error("Please provide `file`");
      return false;
    }

    return this._Editor.getFile(this._RodinIdea.getProjectId(), {
      filename: file.path
    });
  }

  save(file = null) {

    if (!file) {
      throw new Error("Please provide `file`");
      return false;
    }

    return this._Editor.updateFile(this._RodinIdea.getProjectId(), {
      content: file.content
    }, {
      action: "save",
      filename: file.path
    }).then(()=> {
      if (file) {
        file.originalContent = file.content;
        file.isUnsaved = false;
      }
      this._RodinPreview.update();
    });
  }


  create(reqData = {}) {
    return this._Editor.createFile(this._RodinIdea.getProjectId(), reqData);
  }


  rename(file = null, reqData = {}) {
    if (!file) {
      throw new Error("Please provide `file`");
      return false;
    }
    reqData.filename = file.path;

    return this._Editor.updateFile(this._RodinIdea.getProjectId(), reqData);
  }


  delete(file = null) {
    if (!file) {
      throw new Error("Please provide `file`");
      return false;
    }

    return this._Editor.deleteFile(this._RodinIdea.getProjectId(), {
      filename: file.path
    });
  }

}

export default File;