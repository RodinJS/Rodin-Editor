/**
 * Created by kh.levon98 on 17-Oct-16.
 */

import * as _ from "lodash/lodash.min";

function RodinTabsFactory(Utils, RodinIdea, $emit, Storage) {
  'ngInject';

  let model = {};

  let data = {};
  let info = {};
  let config = {};

  model.initialize = initialize;
  model.destroy = destroy;
  model.getInfo = getInfo;
  model.getList = getList;
  model.setList = setList;
  model.setInfo = setInfo;
  model.get = get;
  model.add = add;
  model.remove = remove;
  model.setActive = setActive;
  model.saveState = (compId = "") => {
    saveState(compId, config[compId] ? config[compId].callbacks.stateMiddleware : null);
  };
  model._removeImitation = _removeImitation;

  return model;

  function initialize(compId = Utils.generateUniqueString(), bindings = {}) {
    if (compId in data) {
      throw new Error('Component with this ID already exists.');
      return false;
    }

    data[compId] = [{
      name: "untitled",
      isBlank: true,
      index: 0
    }];

    info[compId] = {
      activeIndex: 0
    };

    config[compId] = bindings;

    return compId;
  }

  function destroy(compId) {
    delete data[compId];
    delete info[compId];
  }

  function setActive(compId = "", tab = 0) {
    let compInfo = info[compId];

    if (_.isObject(compInfo)) {
      compInfo.activeIndex = (_.isNumber(tab) ? tab : tab.index);
      $emit(`tabs:${compId}:change-active-tab`);
      if (config[compId].saveState) {
        saveState(compId, config[compId].callbacks.stateMiddleware);
      }
    }
  }

  function add(compId = "", tab) {
    let comp = data[compId];
    if (_.isArray(comp)) {

      if (comp.length === 1 && comp.first().isBlank && !comp.first().content) {
        comp.splice(0, 1);
      }

      tab.index = comp.length;

      comp.push(tab);

      this.setActive(compId, tab);
    }
  }

  function remove(compId = "", tab = null) {
    let comp = data[compId];
    let tabs = model._removeImitation(compId, tab);

    if (tabs.oldTab && tabs.nextTab) {
      let index = tabs.oldTab.index;
      comp.splice(index, 1);

      for (let i = index, ln = comp.length; i < ln; ++i) {
        comp[i].index--;
      }

      if (tabs.nextTab.isBlank) {
        comp.push(tabs.nextTab);
      }

      this.setActive(compId, tabs.nextTab);
    }
  }

  function get(compId = "", tab = null, filterBy = "") {
    let comp = data[compId] || [];
    let compInfo = info[compId] || {};

    /// if set `filterBy` filter tabs list
    if (!_.isEmpty(filterBy)) {
      tab = _.filter(comp, filterBy)[0] || {};
    }

    /// if tab is null assign them active tab index
    if (_.isNull(tab)) {
      tab = compInfo.activeIndex;
    }

    const index = (_.isNumber(tab) ? tab : tab.index);

    return comp[index];
  }

  function getList(compId = "") {
    return data[compId];
  }

  function setList(compId = "", val = {}) {
    return data[compId] = val;
  }

  function getInfo(compId = "") {
    return info[compId] || {};
  }

  function setInfo(compId = "", val = {}) {
    info[compId] = val;

    model.setActive(compId, val.activeIndex);
  }

  function _removeImitation(compId = "", tab = null) {
    let comp = data[compId];
    let oldTab;
    let nextTab;

    if (_.isArray(comp)) {

      let compInfo = info[compId];

      if (_.isNull(tab)) {
        tab = compInfo.activeIndex;
      }

      const index = (_.isNumber(tab) ? tab : tab.index);
      oldTab = model.get(compId, index);

      if (comp.length == index + 1) {
        if (index === 0) {
          nextTab = {
            name: "untitled",
            isBlank: true,
            index: 0
          };
        } else {
          nextTab = comp[index - 1];
        }
      } else {
        nextTab = comp[index + 1];
      }
    }

    return {
      oldTab: oldTab,
      nextTab: nextTab
    }
  }

  function saveState(compId, cb) {
    return;
    let state = {
      data: data[compId],
      info: info[compId]
    };

    Storage.projectScopeSet(RodinIdea.getProjectId(), compId, (cb && _.isFunction(cb) ? cb(_.cloneDeep(state)) : state));
  }
}

export default RodinTabsFactory;