/** @jsx React.DOM */

"use strict"; 

var React = require('react');

var PreparationListSelectorItem = React.createClass({

	render: function() {
		return <li onClick={this.props.onSelected}>{this.props.description}</li>;
	}
});


var PreparationListSelector = React.createClass({

	render: function() {

		var options = this.props.selectionOptions.map(function(o){
			return <PreparationListSelectorItem key={JSON.stringify(o)} description={o.description} onSelected={o.onSelected} />;		
		}, this);
		return <div>
					<ul>
						{options}
					</ul>
			   </div>;
	}
});

module.exports = PreparationListSelector;