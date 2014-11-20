/** @jsx React.DOM */

"use strict";

var React = require('react');
var facade = require('../Services/RemoteFacade');
var settings = require('../Services/Settings');

var Configuration = React.createClass({

	handleChange: function () {

		/*
		* Este manejador lo deberiamos de replicar en todos los controles
		* en los que el usuario pueda interactuar y necesitemos refrescar la vista
		* justo despues de la interaccion del usuario.
		*
		* Example:
		* El caso del dropdownlist, que al cambiar de elemento necesitamos que se
		* quede como seleccioando ese elemento.
		* */

 		var display = this.refs.display.getDOMNode().value;
		var language = this.refs.language.getDOMNode().value;

		this.setState({
			selectedKitchenDisplay: display,
			selectedLanguage: language
		});

	},

	componentDidMount : function() {

		var self = this;

		var displaysAvaibles = facade.getAllKitchenDisplays();
		var languagesAvaibles= facade.getAvailableLanguages();

		/* $.WHEN
		* Podemos lanzar varias funciones-promesas, y cuando esten las dos terminadas
		* hacer cosas... :D
		* */
		$.when(displaysAvaibles,languagesAvaibles).then(function(displays, languages){
			self.setState({
				kitchenDisplays: displays,
				availableLanguages: languages
			});
		});
	},

	getInitialState: function(){

		return {
			kitchenDisplays: [],
			availableLanguages: [],
			errorMessage: "",
			selectedKitchenDisplay: settings.isInitialized()? settings.displayId() : "0",
			selectedLanguage: settings.isInitialized()? settings.getLanguageCode() : ""
		};
	},

	handleSubmit: function(e){

		/*** Esto lo utilizamos cuando usamos el value en el 'select'
		 * ya que podemos recuperar el nuevo dato del propio state.
		 */
		//var selectedDisplayId = this.state.selectedKitchenDisplay;

		/*Tenemos con el el defaultValue del 'select',
		 * necesitamos esto para poder guardar en localstorage, ya que
		 * necesitamos cogerlo del propio DOM
		 */

		/*
		* Esta forma es un poco ANTI-REACT, ya que obtenemos los datos de la propia vista
		* cuando la filosofia es tener un modelo que se actualiza y renderiza la vista
		* */
		var selectedDisplayId = this.refs.display.getDOMNode().value;

		var selectedLanguageCode = this.state.selectedLanguage;

		e.preventDefault();

		if ( !selectedDisplayId || !selectedLanguageCode){
			this.setState({errorMessage: "Debe seleccionar un visor de cocina y el lenguaje"});
			return;
		}

		settings.update({displayId: selectedDisplayId, languageCode: selectedLanguageCode});

		this.props.goToKitchenDisplay();
	},

	render: function() {

		var displayState = this.state.selectedKitchenDisplay;
		var languageState = this.state.selectedLanguage;

		var kitchenDisplays = this.state.kitchenDisplays.map(function(display){
			return <option key={display.Id} value={display.Id}>{display.Name}</option>;
		});

		var languages = this.state.availableLanguages.map(function(language){
			return <option key={language.Code} value={language.Code}>{language.Name}</option>;
		});

		/*
		* PRUEBAS CON 'VALUE' Y 'DEFAULTVALUE' EN EL SELECT
		*
		* VALUE: Esto establece el control como 'controlled'
		*
		* 		<select id="kitchenDisplays" ref="display" value={displayState} onChange={this.handleChange}>
		*
		* DEFAULTVALUE: lo establece como 'uncontrolled'. (NO FUNCIONA :'( )
		*
		* 		<select id="kitchenDisplays" ref="display" defaultValue={displayState}>
		*
		* More info: http://facebook.github.io/react/docs/forms.html#why-select-value
		*
		* DESPUES DE LAS PRUEBAS:
		*
		* Hemos visto que no funciona correctamente el DEFAULTVALUE.Conseguimos guardar las cosas
		* correctamente en el localstorage al pasar por el 'submit'.
		* Pero no conseguimos que la vista establezca el valor del storage al viajar entre vistas
		* */
		return <form>
				<div>
					<select id="kitchenDisplays" ref="display" value={displayState} onChange={this.handleChange}>
						{kitchenDisplays}
					</select>
				</div>

				<div>
					<select id="languages" ref="language" value={languageState}
							onChange={this.handleChange}>
						<option value=""></option>
						{languages}
					</select>
				</div>
				<button onClick={this.handleSubmit}>Guardar</button>
				<label>{this.state.errorMessage}</label>
			</form>;
	}
});

module.exports = Configuration;