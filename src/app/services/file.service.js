/**
 * Created by kh.levon98 on 28-Oct-16.
 */
class File {
    constructor(Editor, RodinIdea, RodinPreview, Project, Notification) {
        'ngInject';

        this._Editor = Editor;
        this._RodinIdea = RodinIdea;
        this._RodinPreview = RodinPreview;
        this._Project = Project;
        this._Notification = Notification;
        this.isSystemJsExist = false;
        this._Editor.getProject(this._RodinIdea.getProjectId())
            .then((res) => {
                this.isSystemJsExist = !!(res.tree.children.filter((element) => element.name === 'systemjs')[0])
            })
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

    save(file = null, transpile = this.isSystemJsExist) {

        if (!file) {
            throw new Error("Please provide `file`");
            return false;
        }

        if (!file.isUnsaved) {
            return false;
        }

        return this._Editor.updateFile(this._RodinIdea.getProjectId(), {
            content: file.content,
            filename: file.path
        }, {
            action: "save"
        }).then(() => {
            if (file) {
                file.originalContent = file.content;
                file.isUnsaved = false;
            }

            if (transpile) {
                this._Project.buildCode(this._RodinIdea.getProjectId()).then(() => {
                    this._Notification.info("Transpile started.");
                });
            }
        });
    }


    create(reqData = {}) {
        reqData.action = "create";
        return this._Editor.createFile(this._RodinIdea.getProjectId(), reqData);
    }

    copy(reqData = {}) {
        reqData.action = "copy";
        return this._Editor.createFile(this._RodinIdea.getProjectId(), reqData);
    }

    upload(files = [], reqData = {}) {
        return this._Editor.uploadFile(this._RodinIdea.getProjectId(), files, reqData);
    }


    rename(file = null, reqData = {}) {
        if (!file) {
            throw new Error("Please provide `file`");
            return false;
        }
        reqData.filename = file.path;

        return this._Editor.updateFile(this._RodinIdea.getProjectId(), reqData, {
            action: "rename"
        });
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