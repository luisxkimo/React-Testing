/*global require, module, window */

function Localize() {

	"use strict";
	
	var settings = require('./Settings');

	var languageCode = settings.getLanguageCode();
	var DEFAULT_LANGUAGE = "es";

	var formatValue = function(value, format){

		// TODO: Ver que hacemos aquí
		if(format.toLowerCase() === "c"){
			return value.toFixed(2) + " €";
		}
			
						
		if(format.indexOf("dd") !== -1 || 
			format.indexOf("MM") !== -1 || 
			format.indexOf("yy") !== -1 || 
			format.indexOf("HH") !== -1 || 
			format.indexOf("mm") !== -1 || 
			format.indexOf("ss") !== -1)
				return  value.format(format);

			var numericFormats = /F(\d+)/g.exec(format) || [];
			if (numericFormats.length > 0)
					return value.toFixed(_(numericFormats).last());
			
			return value;
	};

	var localize = {

		resetLanguageCode: function() {
			languageCode = settings.getLanguageCode();
		},

		setLanguageCode: function(value) {
			
			if (!value) throw 'New languageCode cannot be empty';

			languageCode = value;

			// 
			// $rootScope.$broadcast('languageCodeChanged');
		},
		
		text: function(value) {
			var text =  window.RES[languageCode][value] || window.RES[DEFAULT_LANGUAGE][value];

			if (!text) {
				throw "El recurso no existe por lo que no se puede localizar: " + value;
			}

			if(arguments.length > 1){
				
				var args = Array.prototype.splice.call(arguments, 1, arguments.length - 1);
				var pattern = /{(\d+)(:(.+))?}/g;
				text = text.replace(pattern, function(match, position, ignore, format) { 
					var value = args[position];
					return format ? formatValue(value, format) : value;
				});
			}
			return text;
		}
	};	

	return localize;
}

module.exports = new Localize();
