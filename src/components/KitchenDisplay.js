/** @jsx React.DOM */

"use strict";

var React = require('react');
var PreparationList = require('./PreparationList');
var PreparationListSelector = require('./PreparationListSelector');


var KitchenDisplay = React.createClass({

	propTypes: {
		goToConfiguration: React.PropTypes.func.isRequired
	},

	getPendingPreparations : function(){
		this.setState({preparations : getPendingSamplePreparations()});
	},

	getPreparedPreparations : function(){
		this.setState({preparations : getPreparedSamplePreparations()});
	},

	getInitialState: function(){
		return {
			
			selectionOptions: 
			[ 
				{description: "Pendientes", onSelected: this.getPendingPreparations},
				{description: "Preparadas", onSelected: this.getPreparedPreparations}
			],
			preparations: []
		};
	},

	render: function() {

		return <div>
					<button onClick={this.props.goToConfiguration}>Configuracion</button>
					<PreparationListSelector selectionOptions={this.state.selectionOptions}/>
					<PreparationList preparations={this.state.preparations}/>
				</div>;
	}
});


function getPendingSamplePreparations(){

	return [

		{
			user: "Mauricio",
			location: "Salón M1",
			date: new Date(),
			items : [
				{
					product: "JB",
					addins: ["Coca Cola"],
					notes: "Con hielo",
					quantity: 2,
					preparationOrder: "Bebidas",
					preparationType: "Barra"
				},
				{
					product: "Coca Cola",
					addins: [],
					notes: "",
					quantity: 1,
					preparationOrder: "Bebidas",
					preparationType: "Barra"
				}
			]
		},

		{
			user: "Pedro",
			location: "Salón M2",
			date: new Date(),
			items : [
				{
					product: "Coca Cola",
					addins: [],
					notes: "",
					quantity: 2,
					preparationOrder: "Bebidas",
					preparationType: "Barra"
				}
			]
		}
	];
}

function getPreparedSamplePreparations(){

	return [
		{
			user: "Pedro",
			location: "Salón M2",
			date: new Date(),
			items : [
				{
					user: "Mauricio",
					product: "Coca Cola",
					addins: [],
					notes: "",
					quantity: 1,
					preparationOrder: "Bebidas",
					preparationType: "Barra"
				}
			]
		}
	];

}

module.exports = KitchenDisplay;