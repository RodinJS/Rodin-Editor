/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinIdeaFactory(Storage) {
  'ngInject';

  let model = {};
  let projectId = null;
  let Project = null;

  let projectDefaultSett = {
    treeState: {},
    resizeItemConfig: {
      vertical: [],
      horizontal: ["20%", "40%", "40%"]
    },
    windowActivity: {
      tree: true,
      preview: true,
      inspector: true,
      monitor: true
    }
  };

  model.windowActivity = Storage.projectScopeGet("windowActivity") || projectDefaultSett.windowActivity;


  model.setWindowActivity = setWindowActivity;

  model.getProjectId = getProjectId;
  model.setProjectId = setProjectId;
  model.setProject = setProject;
  model.getProject = getProject;


  return model;

  function setWindowActivity(name = '', val = false) {
    model.windowActivity[name] = !!val;
    Storage.projectScopeSet("windowActivity", model.windowActivity);
  }

  function getProjectId() {
    return projectId;
  }

  function setProject(project){
      Project = project;
      return Project;
  }

  function getProject(){
    return Project;
  }

  function setProjectId(id = null) {
    Storage.set(`project_${id}`, _.merge(projectDefaultSett, Storage.get(`project_${id}`)));

    return projectId = id;
  }

}

export default RodinIdeaFactory;