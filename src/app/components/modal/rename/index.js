import RenameCtrl from './controller';

const Rename = {
  templateUrl: 'components/modal/rename/index.html',
  controller: RenameCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Rename;