
/*global require, module */

function Bus(){

	"use strict";

	var MSG = require('./Messages');

	return {
		process: function(type, payload) {

			var deferred = new $.Deferred();

			setTimeout(function(){

				if (type === MSG.GetAllKitchenDisplays)
				deferred.resolve({ All:
					[
						{Id: 1, Name: 'Display 1'},
						{Id: 2, Name: 'Display 2'}
					]});

				if (type === MSG.GetAvailableLanguages)
					deferred.resolve({ Languages:
						[
							{Code: 'es', Name: 'Español'},
							{Code: 'en', Name: 'Inglés'}
						]});
				
			}, 1000);
			

			return deferred.promise();
		}
	};
}

module.exports = new Bus();