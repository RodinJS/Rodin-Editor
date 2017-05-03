/**
 * Created by kh.levon98 on 28-Sep-16.
 */
class Editor {
    constructor(JWT, AppConstants, Restangular, Validator, Analyser, $state, $q, cfpLoadingBar, $interval) {
        'ngInject';
        this._JWT = JWT;
        this._AppConstants = AppConstants;

        this._Editors = Restangular.all('editor');
        this._$state = $state;
        this._$q = $q;
        this._Validator = new Validator();
        this._Analyser = Analyser;
        this._LoadingBar = cfpLoadingBar;
        this._$interval = $interval;
    }

    getProject(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();

        this._Editors.one(projectId).get(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    getFile(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();
        fields.id = projectId;
        this._Editors.one("serve").get(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    createFile(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();
        this._Editors.all("serve").post(fields, {
            id: projectId
        }).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    updateFile(projectId = null, body = {}, fields = {}) {
        let Analyser = new this._Analyser();
        fields.id = projectId;
        this._Editors.one("serve").customPUT(body, undefined, fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    deleteFile(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();

        fields.id = projectId;

        this._Editors.one("serve").remove(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }

    uploadFile(projectId = null, files = [], fields = {}) {
        let Analyser = new this._Analyser();


        let totalSize = 0;
        let formData = new FormData();

        for (let i = 0, ln = files.length; i < ln; ++i) {
            let file = files[i];
            totalSize = totalSize+file.size;
            formData.append("file", file);
        }

        for (let i in fields) {
            formData.append(i, fields[i]);
        }


        const totalSizeMB = (totalSize / (1024*1024)).toFixed(0);
        let loaderProgress = 0;
        this._LoadingBar.start();
        this.timer = this._$interval(() => {
            loaderProgress  += ((0.001*100)/totalSizeMB);
            this._LoadingBar.set(loaderProgress)
        }, 200);


        this._Editors.one("upload")
            .withHttpConfig({
                transformRequest: angular.identity,
                timeout: 0 // Avoid global setting's timeout on upload
            })
            .customPOST(formData, null, {
                id: projectId
            }, {
                'Content-Type': () => {
                    return undefined;
                }
            }).then((response) => {
            this._$interval.cancel(this.timer);
            this._LoadingBar.complete();
            Analyser.resolve(response);
        }, (error) => {
            this._$interval.cancel(this.timer);
            this._LoadingBar.complete();
            Analyser.reject(error);
        });

        return Analyser.promise;
    }

    findAndReplace(projectId = null, fields = {}) {
        let Analyser = new this._Analyser();

        fields.id = projectId;

        this._Editors.one("search").get(fields).then(Analyser.resolve, Analyser.reject);

        return Analyser.promise;
    }
}

export default Editor;