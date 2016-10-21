/**
 * Created by kh.levon98 on 30-Sep-16.
 */
class Utils {
	constructor($log) {
		'ngInject';

		this._$log = $log;
	}

	generateUniqueString(length = 8) {
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let text = "";

		for (let i = 0; i < length; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	bindKey(win, mac) {
		return {win: win, mac: mac};
	}
}

export default Utils;