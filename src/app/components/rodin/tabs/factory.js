/**
 * Created by kh.levon98 on 17-Oct-16.
 */

import * as _ from "lodash/dist/lodash.min";

function RodinTabsFactory(Utils) {
	'ngInject';

	let model = {};

	let data = {};
	let info = {};

	model.initialize = initialize;
	model.getInfo = getInfo;
	model.getList = getList;
	model.get = get;
	model.add = add;
	model.remove = remove;
	model.setActive = setActive;

	return model;

	function initialize(compId = Utils.generateUniqueString()) {
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

		return compId;
	}

	function setActive(compId = "", tab = 0) {

		let compInfo = info[compId];

		if (_.isObject(compInfo)) {
			compInfo.activeIndex = (_.isNumber(tab) ? tab : tab.index);
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
		if (_.isArray(comp)) {

			let compInfo = info[compId];

			if (_.isNull(tab)) {
				tab = compInfo.activeIndex;
			}

			const index = (_.isNumber(tab) ? tab : tab.index);

			comp.splice(index, 1);

			for (let i = index, ln = comp.length; i < ln; ++i) {
				comp[i].index--;
			}

			if (comp.length == 0) {
				comp.push({
					name: "untitled",
					isBlank: true,
					index: comp.length
				});
			}


			let nextTab = comp[index];

			this.setActive(compId, (nextTab ? nextTab : comp[index - 1]));
		}
	}

	function get(compId = "", tab = null) {
		let comp = data[compId] || [];
		let compInfo = info[compId] || {};

		if (_.isNull(tab)) {
			tab = compInfo.activeIndex;
		}

		const index = (_.isNumber(tab) ? tab : tab.index);

		return comp[index];
	}

	function getList(compId = "") {
		return data[compId];
	}

	function getInfo(compId = "") {
		return info[compId] || {};
	}

}

export default RodinTabsFactory;