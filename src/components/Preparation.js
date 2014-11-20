/** @jsx React.DOM */

"use strict";

var React = require('react');


var PreparationItem = React.createClass({

	render: function() {

		var item = this.props.item;

		return <li>[{item.product}] </li>;
	}
});


var Preparation = React.createClass({

	render: function() {

		var preparation = this.props.preparation; 

		var items = preparation.items.map(function(i){
			return <PreparationItem key={JSON.stringify(i)} item={i} />;		
		}, this);

		return <div>
					<div>
						<p>{preparation.user} {preparation.location}</p>
					</div>
					 
					<ul>{items}</ul>
			   </div>;
	}
});

module.exports = Preparation;