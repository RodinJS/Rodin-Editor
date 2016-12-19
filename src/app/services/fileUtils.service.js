/**
 * Created by kh.levon98 on 30-Sep-16.
 */


const typeToIconMap = {
  "html": {
    "class": "fa fa-html5 color-icon-orange",
    "content": "",
    "editorMode": "html"
  },
  "folder": {
    "class": "material-icons color-icon-blue",
    "content": "folder_open",
    "editorMode": "text"
  },
  "js": {
    "class": "ion ion-social-nodejs color-icon-red",
    "content": "",
    "editorMode": "javascript"
  },
  "css": {
    "class": "fa fa-file-text-o color-icon-green",
    "content": "",
    "editorMode": "css"
  },
  "txt": {
    "class": "fa fa-file-text-o color-icon-green",
    "content": "",
    "editorMode": "text"
  },
  "unknown": {
    "class": "fa fa-file-text-o color-icon-green",
    "content": "",
    "editorMode": "text"
  }
};


export default class FileUtils {
  constructor($log) {
    'ngInject';

    this._$log = $log;
  }


  getFileOptions(node) {
    let fileType = this.getFileType(node);

    let fileOpts = typeToIconMap[fileType];

    if (!fileOpts) {
      fileType = "unknown";
      fileOpts = typeToIconMap[fileType];
    }

    fileOpts["fileType"] = fileType;

    return fileOpts;
  }

  isImage(node) {
    return (["jpg", "jpeg", "png", "gif"].indexOf(this.getFileType(node)) !== -1);
  }

  getFileType(node) {
    const fileName = node.name;
    let fileType;
    if (node.type === "directory") {
      fileType = "folder";
    } else {
      fileType = ((/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : "unknown").toLowerCase();
    }
    return fileType;
  }
}

