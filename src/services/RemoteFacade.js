/*global require, module */

function RemoteFacade(){
	
	"use strict";

	var bus = require('./Bus');
	var MSG = require('./Messages');

	return {

		getAllKitchenDisplays: function() {
			return bus.process(MSG.GetAllKitchenDisplays).then(function(msg) {
				return msg.All;
			});
		},

		getAvailableLanguages: function() {
			return bus.process(MSG.GetAvailableLanguages).then(function(msg) {
				return msg.Languages;
			});
		}
	};
}

module.exports = new RemoteFacade();