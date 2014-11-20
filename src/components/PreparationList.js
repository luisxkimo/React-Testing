/** @jsx React.DOM */
 
"use strict";

var React = require('react');
var Preparation = require('./Preparation');

var PreparationList = React.createClass({

	render: function() {

		var items =this.props.preparations.map(function(p){
			return <Preparation key={JSON.stringify(p)} preparation={p} />;		
		}, this);

		return <div>{items}</div>;
	}
});

module.exports = PreparationList;