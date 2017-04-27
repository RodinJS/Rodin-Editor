/**
 * Created by kh.levon98 on 24-Sep-16.
 */


import JSZip from "jszip/dist/jszip.min";
import * as _ from "lodash/lodash.min";


// import saveAs from "https://stuk.github.io/jszip/vendor/FileSaver.js";

let self;

class TreeCtrl {

    constructor($scope,
                $timeout,
                VCS,
                $log,
                File,
                FileUtils,
                RodinTabs,
                RodinTabsConstants,
                RodinTree,
                RodinEditor,
                RodinIdea,
                Modal,
                $on,
                $q,
                Notification,
                Storage,
                Utils,
                AppConstants,
                $window,
                $stateParams,
                Project,
                User,
                $state) {
        'ngInject';
        self = this;
        this._$scope = $scope;
        this._$timeout = $timeout;
        this._VCS = VCS;
        this._RodinTabs = RodinTabs;
        this._RodinTabsConstants = RodinTabsConstants;
        this._RodinTree = RodinTree;
        this._RodinEditor = RodinEditor;
        this._FileUtils = FileUtils;
        this._File = File;
        this._$window = $window;
        this._RodinIdea = RodinIdea;
        this._Modal = Modal;
        this._Storage = Storage;
        this._Utils = Utils;
        this._Notification = Notification;
        this._AppConstants = AppConstants;
        this._$stateParams = $stateParams;
        this._$state = $state;
        this._Project = Project;
        this._User = User;
        this._$log = $log;
        this._$q = $q;
        this._$on = $on;

        this.data = this._RodinTree.data;
        this.treeFilter = "";
        this._buffer = null;

        this.rootMenuOptions = [
            ['New File', this._createFile],
            ['Upload File', this._uploadFile],
            ['Paste', ($itemScope, $event, node, text, $li) => {
                this._paste($itemScope, $event, node, text, $li).then((data) => {
                    this._Notification.success("File successfully copied.");
                }, (err) => {
                    if (err && err.length) {
                        err = err.first();
                        let message;
                        switch (err.code) {
                            case 336:
                            case 333:
                                message = "File already exists.";
                                break;
                            default:
                                message = "Can't copy file";
                                break;
                        }

                        this._Notification.error(message);
                    }
                });
            }],
            null,
            ['New Folder', this._createFolder],
            ['Upload Folder', this._uploadFolder],
            // ['Find in Folder', this._findInFolder]
        ];

        this.fileMenuOptions = [
            ['Rename...', this._rename],
            ['Copy', this._copy],
            ['Delete File', this._delete]
        ];

        this.directoryMenuOptions = [
            ['New File', this._createFile],
            ['Upload File', this._uploadFile],
            ['Rename...', this._rename],
            ['Copy', this._copy],
            ['Paste', ($itemScope, $event, node, text, $li) => {
                this._paste($itemScope, $event, node, text, $li).then((data) => {
                    this._Notification.success("File successfully copied.");
                }, (err) => {
                    if (err && err.length) {
                        err = err.first();
                        let message;
                        switch (err.code) {
                            case 336:
                            case 333:
                                message = "File already exists.";
                                break;
                            default:
                                message = "Can't copy file";
                                break;
                        }

                        this._Notification.error(message);
                    }
                });
            }],
            null,
            ['New Folder', this._createFolder],
            ['Upload Folder', this._uploadFolder],
            ['Delete Folder', this._delete],
            ['Find in Folder', this._findInFolder]
        ];

        this.treeOptions = {
            beforeDrop: (e) => {
                let deferred = self._$q.defer();
                let sourceNode = e.source.nodeScope.$modelValue;
                let destNode = e.dest.nodesScope.node;
                if (sourceNode.parent !== destNode.path && destNode.type === "directory") {
                    let _buffer = this._buffer;
                    this._copy(null, null, sourceNode);

                    this._paste(null, null, destNode, null, null, true).then(() => {
                        self._RodinTree.deleteFile(sourceNode).then(() => {
                            this._Notification.success("File successfully moved.");
                            deferred.resolve();
                        }, () => {
                            this._Notification.warning("File successfully moved, but original file can't be removed.");
                            deferred.reject();
                        });
                    }, (err) => {
                        if (err && err.length) {
                            err = err.first();
                            let message;
                            switch (err.code) {
                                case 336:
                                case 333:
                                    message = "File already exists.";
                                    break;
                                default:
                                    message = "Can't move file";
                                    break;
                            }

                            this._Notification.error(message);
                        }
                        deferred.reject();
                    });

                    self._buffer = _buffer;
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            }
        };

        this._$scope.$watch(() => {
            return this._RodinIdea.getProjectId();
        }, (id) => {
            if (id) {
                this.__initTree();
            }
        });


        this._$on("menu-bar:copyFile", (e, node, model) => {

            let file = self._RodinTabs.get(self._RodinTabsConstants.editor);

            console.log("file", file, self._Utils.findNodeByPath(self._RodinTree.data, file.parent));

            self._copy(null, null, file);

            self._paste(null, null, self._Utils.findNodeByPath(self._RodinTree.data, file.parent), null, null, file).then((data) => {
                this._Notification.success("File successfully copied.");
            }, (err) => {
                if (err && err.length) {
                    err = err.first();
                    let message;
                    switch (err.code) {
                        case 336:
                        case 333:
                            message = "File already exists.";
                            break;
                        default:
                            message = "Can't copy file";
                            break;
                    }

                    this._Notification.error(message);
                }
            });
        });

        this._$on("menu-bar:uploadFile", (e, node, model) => {
            self._uploadFile(null, null, node);
        });

        this._$on("menu-bar:uploadFolder", (e, node, model) => {
            self._uploadFolder(null, null, node);
        });

        this._$on("menu-bar:newFile", (e, node, model) => {
            self._createFile(null, null, node);
        });

        this._$on("menu-bar:newFolder", (e, node, model) => {
            self._createFolder(null, null, node);
        });

        this._$on("menu-bar:pull", (e, node, model) => {
            self._pull(null, null, node);
        });

        this._$on("menu-bar:push", (e, node, model) => {
            self._push(null, null, node);
        });

        this._$on("menu-bar:findInFolder", (e, node, model) => {
            self._findInFolder(null, null, node);
        });

        this._$on("menu-bar:replaceInFolder", (e, node, model) => {
            self._replaceInFolder(null, null, node);
        });

    }

    __initTree() {

        if (this._$stateParams.token && this._$stateParams.id && this._User.current) {

            let data = {
                id: this._$stateParams.id,
                token: this._$stateParams.token,
                socialEmail: this._$stateParams.socialEmail,
                email: this._User.current.email,
                sync: true
            };

            this._User.gitAuth(data).then((res) => {
                this._Project.gitSync(this._RodinIdea.getProjectId())
                    .then((res) => {
                        this._$state.go('app.editor', {username:this._$stateParams.username, projectFolder:this._$stateParams.projectFolder, token: undefined, id: undefined, socialEmail: undefined});
                        this._Notification.success(res);
                        location.reload();
                    }, (err) => {
                        console.log('SNYC ERR', err);
                    })

            }, (err) => {
                console.log('GIT SYNC EERROR', err);
            })

        }

        let editor_tabs = this._Storage.projectScopeGet(this._RodinIdea.getProjectId(), this._RodinTabsConstants.editor);


        return this._RodinTree.update({
            firstCall: true,
            folderPath: this._Utils.getTreeActiveState(this._RodinIdea.getProjectId()),
            openFile: editor_tabs && editor_tabs.info ? null : ["index.html"]//["index.html", "index.js", ".html", ".js"],
            // runFile: ["index.html", ".html"]
        }).then(() => {

            if (editor_tabs) {

                for (let i = 0, ln = editor_tabs.data.length; i < ln; i++) {
                    let tab = editor_tabs.data[i];
                    if (!tab.isBlank && !tab.isUnsaved) {
                        setTimeout(() => {
                            const fileParams = _.pick(tab, ['parent', 'path', 'name', 'type']);
                            this._RodinTree.openFile(fileParams, true);
                        }, 0);
                    }
                }
            }


        }, () => {
            this._Storage.projectScopeSet(this._RodinIdea.getProjectId(), "treeState", {});
            this.__initTree();
        });
    }

    updateTree() {
        return this._RodinTree.update({
            folderPath: this._Utils.filterTree(this._RodinTree.data, {active: true}, "path")
        });
    }

    open(scope = {}, node = {}) {
        if (node.type == "directory") {
            return this.toggle(scope);
        } else {
            self._RodinTree.openFile(node);
        }
    }

    toggle(scope) {
        if (scope.node.type == "file") {
            return false;
        }

        let state = this._Storage.projectScopeGet(this._RodinIdea.getProjectId(), "treeState");

        scope.node.active = !scope.node.active;
        state[scope.node.path] = scope.node.active;

        if (scope.node.active && _.isEmpty(scope.node.children)) {
            this._RodinTree.update({
                folderPath: scope.node.path
            });
        } else if (!scope.node.active) {
            for (let i in state) {
                if (i.indexOf(scope.node.path) > -1) {
                    state[i] = false;
                }
            }
        }

        scope.toggle();

        this._Storage.projectScopeSet(this._RodinIdea.getProjectId(), "treeState", state);
    };

    getFileOptions(...args) {
        return this._FileUtils.getFileOptions(...args);
    }

    isFolder(node) {
        return (node.type == 'directory');
    }

    isVisible(node) {
        return !(this.treeFilter && this.treeFilter.length > 0 && node.name.indexOf(this.treeFilter) == -1);
    }

    _delete($itemScope, $event, node, text, $li) {
        self._Modal.confirm({
            message: () => {
                return `Are you sure delete ${node.type}: ${node.name}`;
            }
        }).result.then((res) => {


            let state = self._Storage.projectScopeGet(self._RodinIdea.getProjectId(), "treeState");

            for (let i in state) {
                /// TODO by Lyov: es stugum@ sxala vorovhetev recursiv krknvor nuyn anunov folderneri depqum harama linelu
                if (i.indexOf(node.path) > -1) {
                    delete state[i];
                }
            }

            self._Storage.projectScopeSet(self._RodinIdea.getProjectId(), "treeState", state);

            self._RodinTree.deleteFile(node);
        });
    }

    _rename($itemScope, $event, node, text, $li) {
        self._Modal.rename({
            name: () => {
                return node.name;
            }
        }).result.then((res) => {

            self._RodinTree.renameFile(node, {
                newName: res.newName
            });

        });
    }

    _findInFolder($itemScope, $event, node, text, $li) {
        self._Modal.findAndReplace({
            findText: () => {
                return "";
            },
            path: () => {
                return node.path;
            }
        }).result.then((res) => {

            self._RodinEditor.findInFolder({
                search: res.findText,
                caseSensitive: res.caseSensitive,
                regexp: res.regexp
            });

        });
    }

    _replaceInFolder($itemScope, $event, node, text, $li) {
        return;
        self._Modal.findAndReplace({
            findText: () => {
                return "";
            },
            replaceText: () => {
                return "";
            },
            replace: () => {
                return true;
            },
            path: () => {
                return node.path;
            }
        }).result.then((res) => {

            self._RodinEditor.replaceInFolder(node, {
                search: res.findText,
                replace: res.replaceText,
                caseSensitive: res.caseSensitive,
                regexp: res.regexp
            });

        });
    }

    _createFolder($itemScope, $event, node, text, $li) {
        self._Modal.create({
            name: () => {
                return "";
            },
            path: () => {
                return node.path;
            },
            type: () => {
                return "directory";
            }
        }).result.then((res) => {
            self._RodinTree.createFolder(node, {
                path: res.path,
                name: res.name
            });
        });
    }

    _createFile($itemScope, $event, node, text, $li) {

        self._Modal.create({
            name: () => {
                return "";
            },
            path: () => {
                return node.path;
            },
            type: () => {
                return "file";
            }
        }).result.then((res) => {
            self._RodinTree.createFile(node, {
                path: res.path,
                name: res.name
            });
        });
    }

    _copy($itemScope, $event, node, text, $li) {
        self._buffer = node;
    }

    _paste($itemScope, $event, node, text, $li, file) {

        let deferred = self._$q.defer();

        if (self._buffer && node.type === "directory") {
            self._Modal.create({
                name: () => {
                    return self._buffer.name;
                },
                path: () => {
                    return node.path;
                },
                srcPath: () => {
                    return self._buffer.path;
                },
                type: () => {
                    return self._buffer.type;
                },
                action: () => {
                    return "copy";
                }
            }).result.then((res) => {
                console.log(res, node, file);
                if (res.type === "file") {

                    if(res.flag === 'replace'){
                        return self._RodinTree.replaceFile(node, {
                            name: res.name,
                            path: res.path,
                            srcPath: res.srcPath,
                            content:file ? file.content : '',
                            isUnsaved:true
                        }).then((res) => {
                            deferred.resolve(res);
                        }, (err) => {
                            deferred.reject(err);
                        });
                    }

                    const data = {
                        name: res.name,
                        path: res.path,
                        srcPath: res.srcPath,
                        flag: res.flag
                    };

                    if(res.flag === 'rename'){
                        data.name = data.name.replace(/(\.[\w\d_-]+)$/i, '_copy$1');
                    }

                    self._RodinTree.copyFile(node, data).then((res) => {
                        deferred.resolve(res);
                    }, (err) => {
                        deferred.reject(err);
                    });

                } else {
                    self._RodinTree.copyFolder(node, {
                        name: res.name,
                        path: res.path,
                        srcPath: res.srcPath,
                        flag: res.flag
                    }).then((res) => {
                        deferred.resolve(res);
                    }, (err) => {
                        deferred.reject(err);
                    });
                }
            }, () => {
                deferred.reject();
            });
        }

        return deferred.promise;
    }

    _uploadFile($itemScope, $event, node, text, $li) {
        self._Modal.upload({
            path: () => {
                return node.path;
            },
            type: () => {
                return "file";
            }
        }).result.then((res) => {
            self._RodinTree.uploadFile(res.files, {
                path: res.path,
            });
        });
    }

    _uploadFolder($itemScope, $event, node, text, $li) {
        self._Modal.upload({
            path: () => {
                return node.path;
            },
            type: () => {
                return "directory";
            }
        }).result.then((res) => {

            let zip = new JSZip();
            let deferred = self._$q.defer();
            let promise = deferred.promise;


            for (let i = 0, ln = res.files.length; i < ln; ++i) {
                let file = res.files[i];
                let deferred = self._$q.defer();

                promise.then(() => {
                    let reader = new FileReader();
                    let filePath = file.webkitRelativePath || file.name;

                    reader.onload = (e) => {
                        zip.file(filePath, e.target.result, {binary: true});

                        deferred.resolve(true);
                    };

                    reader.readAsBinaryString(file);
                });

                promise = deferred.promise;
            }

            deferred.resolve(true);

            promise.then(() => {
                zip.generateAsync({type: "blob"})
                    .then(function (content) {

                        // saveAs(content, "example.zip");

                        self._RodinTree.uploadFolder([content], {
                            path: res.path,
                            folderName: res.folderName,
                            zippedFiles: res.files,
                        });
                    });
            });

        });
    }

    _pull($itemScope, $event, node, text, $li) {

        let doRequest = () => {

            self._VCS.pull(this._RodinIdea.getProjectId(), {
                root: self._RodinTree.root
            }).then(() => {
                self._Notification.success("VCS pull success.");
                self._RodinTree.update({
                    folderPath: this._Utils.filterTree(this._RodinTree.data, {active: true}, "path", ""),
                })
                    .then(() => {
                        _.each(this._RodinTabs.getList('EDITOR_TABS'), (file) => {
                            setTimeout(() => {
                                const fileParams = _.pick(file, ['parent', 'path', 'name', 'type']);
                                this._RodinTree.openFile(fileParams, true);
                            }, 0);
                        });
                    })

            }, (err) => {
                if (err && err.length) {
                    err = err.first();
                    let message;
                    switch (err.code) {
                        case 350:
                            message = "Please connect your github account for work with version control.";
                            break;
                        default:
                            message = "VCS pull failed.";
                            break;
                    }

                    this._Notification.error(message);
                }
            });

        };

        if (!self._Storage.get("pull_dialog_flag")) {
            self._Modal.confirm({
                message: () => {
                    return `Warning, <u>in case of version merge conflict</u>, this will automatically accept the changes from outside and ignore your changes.`;
                },
                showFlag: () => {
                    return true;
                }
            }).result.then((res) => {

                self._Storage.set("pull_dialog_flag", res.flag);

                doRequest();
            });
        } else {
            doRequest();
        }
    }

    _push($itemScope, $event, node, text, $li) {


        console.log(this._User);
        const Project = this._RodinIdea.getProject();

        if(!this._User.current.github){
            return self._Modal.gitSync({
                message: () => {
                    return `To be able to push your changes you need to sync with a GitHub account first.`
                },
                showFlag: () => {
                    return false;
                }
            }).result.then((res) => {
                self._$window.location.href = `https://github.com/login/oauth/authorize?client_id=${self._AppConstants.GITHUB}&redirect_uri=${self._AppConstants.API}/git/sync?projectId=${self._RodinIdea.getProjectId()}&scope=user%20repo`;
            });
        }

        if(!Project.github){
            return self._Modal.gitSync({
                message: () => {
                    return `To be able to push your changes you need to sync this project with GitHub first.`
                },
                showFlag: () => {
                    return false;
                }
            }).result.then((res) => {
                self._Project.gitSync(self._RodinIdea.getProjectId())
                    .then((res) => {
                        self._Project.get(self._$stateParams.projectFolder).then((data) => {
                            self._RodinIdea.setProjectId(data._id);
                            self._RodinIdea.setProject(data);
                        })
                        this._Notification.success(res);
                    }, (err) => {
                        console.log('SNYC ERR', err);
                        this._Notification.error(`Can't sync project`);

                    })
            });
        }

        let doRequest = () => {

            self._VCS.push(this._RodinIdea.getProjectId(), {
                root: self._RodinTree.root
            }).then(() => {
                self._Notification.success("VCS push success.");
            }, (err) => {
                if (err && err.length) {
                    err = err.first();
                    let message;
                    switch (err.code) {
                        case 350:
                           message = "Please connect your github account for work with version control.";
                           break;
                        default:
                            message = "VCS push failed.";
                            break;
                    }

                    this._Notification.error(message);
                }
            });

        };

        if (!self._Storage.get("push_dialog_flag")) {
            self._Modal.confirm({
                message: () => {
                    return `Warning, <u>in case of version merge conflict</u>, this will automatically accept the changes from your side and ignore changes from outside.`;
                },
                showFlag: () => {
                    return true;
                }
            }).result.then((res) => {

                self._Storage.set("push_dialog_flag", res.flag);

                doRequest();
            });
        } else {
            doRequest();
        }


    }

}

export default TreeCtrl;

