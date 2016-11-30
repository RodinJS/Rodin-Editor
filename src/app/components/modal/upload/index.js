import UploadCtrl from './controller';

const Upload = {
  templateUrl: 'components/modal/upload/index.html',
  controller: UploadCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Upload;