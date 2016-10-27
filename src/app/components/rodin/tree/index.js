import TreeCtrl from './controller';

const Tree = {
  templateUrl: 'components/rodin/tree/index.html',
  controller: TreeCtrl,
  bindings: {
    projectId: "="
  }
};

export default Tree;