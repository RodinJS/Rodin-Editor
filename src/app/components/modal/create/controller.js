/**
 * Created by kh.levon98 on 31-Oct-16.
 */

let self;

class CreateCtrl {
    constructor($scope, RodinTree) {
        'ngInject';
        self = this;

        this._$scope = $scope;

        this.projectRoot = RodinTree.root;
        this.disabled = false;
        this.name = "";
        this.path = "";
        this.type = "";
        this.action = "";

        this.pattern = new RegExp(/^[-!$%^&*()#_+|~=`{}\[\]:";'<>?,.\/]*?$/g);

        /// copy fields
        this.srcPath = "";
    }


    $onInit() {
        this.name = this.resolve.name || "";
        this.path = this.resolve.path || "";
        this.type = this.resolve.type || "";
        this.flag = this.resolve.flag || "";
        this.action = this.resolve.action || "create";

        /// copy fields
        this.srcPath = this.resolve.srcPath || "";
    }

    cancel() {
        this.dismiss({ $value: 'cancel' });
    }

    save() {
        if (this.name.length > 0 && !this.pattern.test(this.name)) {
            let res = {
                name: this.name,
                path: this.path,
                type: this.type,
                flag: this.flag,

                /// copy fields
                srcPath: this.srcPath
            };
            this.close({ $value: res });
        }


    };
}

export default CreateCtrl;