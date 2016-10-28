/**
 * Created by kh.levon98 on 17-Oct-16.
 */
function RodinIdeaFactory(Storage) {
  'ngInject';
  let model = {};

  model.windowActivity = {
    tree: Storage.get("window_tree") || true,
    preview: Storage.get("window_preview") || true,
    inspector: Storage.get("window_inspector") || true,
    monitor: Storage.get("window_monitor") || true
  };

  model.setWindowActivity = setWindowActivity;

  return model;

  function setWindowActivity(name = '', val = false) {
    model.windowActivity[name] = !!val;
    Storage.set(`window_${name}`, model.windowActivity[name]);
  }
}

export default RodinIdeaFactory;