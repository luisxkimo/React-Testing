/*global module */


function Messages() {

	"use strict";
	
	return {
		GetAllKitchenDisplays: 'IGT.POS.Bus.SystemManagement.Messages.GetAllKitchenDisplaysRequest',
		GetAvailableLanguages: 'IGT.POS.Bus.Common.Messages.GetAvailableLanguagesRequest'
	};
}

module.exports = new Messages();