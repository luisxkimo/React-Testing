/*global module, window */

function Settings(){

	"use strict";

	function createMachineId() {

			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		}

	var localStorage = window.localStorage;

	var displayId, machineId, languageCode;

	var update = function (settings) {
		displayId = settings.displayId;
		languageCode = settings.languageCode;

		localStorage.setItem('Settings.displayId', displayId);
		localStorage.setItem('Settings.languageCode', languageCode);
	};

	var refresh = function () {

		displayId = parseInt(localStorage.getItem('Settings.displayId'), 10) || 0;
		languageCode = localStorage.getItem('Settings.languageCode') || 'es';

		machineId = localStorage.getItem('Settings.machineId') || '';
		if (machineId === '') {
			machineId = createMachineId();
			localStorage.setItem('Settings.machineId', machineId);	
		}
	};

	refresh();

	return {
		isInitialized : function() { return displayId !== 0; },
		displayId : function() { return displayId; },
		getMachineId : function() { return machineId; },
		getLanguageCode : function() { return languageCode; },
		refresh: refresh,
		update: update
	};
}

module.exports = new Settings();

