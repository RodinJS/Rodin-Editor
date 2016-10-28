/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinIdeaFactory() {
  'ngInject';

  let model = {};
  let projectId = null;

  model.getProjectId = getProjectId;
  model.setProjectId = setProjectId;

  return model;

  function getProjectId() {
    return projectId;
  }

  function setProjectId(val = null) {
    return projectId = val;
  }

}

export default RodinIdeaFactory;