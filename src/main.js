/** @jsx React.DOM */

"use strict";

$(function(){

	var React = require('react');
	
	var AppScreen = require('./components/AppScreen.js');

	React.render(<AppScreen />, document.getElementById('content'));
});

