import FindAndReplaceCtrl from './controller';

const FindAndReplace = {
  templateUrl: 'components/modal/findandreplace/index.html',
  controller: FindAndReplaceCtrl,
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default FindAndReplace;