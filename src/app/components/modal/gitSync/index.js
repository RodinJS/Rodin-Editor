import ConfirmCtrl from './controller';

const Confirm = {
  templateUrl: 'components/modal/gitSync/index.html',
  controller: ConfirmCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default Confirm;