/** @jsx React.DOM */

"use strict";
 
var React = require('react');
var KicthenDisplay = require('./KitchenDisplay');
var Configuration = require('./Configuration');
var CssPage = require('./CssPage');
var settings = require('../Services/Settings');

var AppScreen = React.createClass({


	createKitchenDisplayElement : function(){
		return <KicthenDisplay goToConfiguration={this.goToConfiguration} />;
	},

	createConfigurationElement : function(){
		return <Configuration goToKitchenDisplay={this.goToKitchenDisplay} />;
	},

	createCssPage : function(){
		return <CssPage goToCssPage={this.goToCssPage}/>;
	},

	goToConfiguration : function() {
		this.setState({currentPage : this.createConfigurationElement() });
	},

	goToKitchenDisplay : function() {
		this.setState({currentPage : this.createKitchenDisplayElement() });
	},

	goToCssPage : function() {
		this.setState({currentPage : this.createCssPage() });
	},

	getInitialState: function(){

		return{
			currentPage: this.createCssPage()
		};
		/*return settings.isInitialized()?
			{ currentPage : this.createKitchenDisplayElement() } : 
			{ currentPage : this.createConfigurationElement() };	*/
	},

	render: function() {
		return this.state.currentPage;
	}
});

module.exports = AppScreen;