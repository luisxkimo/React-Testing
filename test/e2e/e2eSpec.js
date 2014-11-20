"use strict";

module.exports = {
	/*  'Demo test Google': function(browser) {
    browser
      .url('index.html')
      .waitForElementVisible('body', 1000);
      .setValue('input[type=text]', 'gatos')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]').pause(1000)
      .assert.containsText('#main', 'gato')
      .end();
  }*/
	before : function(browser) {
		//console.log("Setting up...");
		this.body = browser.url('E:/Desarrollo/reactjs-test_CON_NIGHTWATCH/reactjs-test/index.html')
			.waitForElementVisible('body', 1000);
	},

	after : function(browser){

		browser.end();
	},

	'Test 1': function(browser) {

		var cmbKitchenDisplay = this.body.waitForElementVisible('select',1000);

		browser.assert.attributeEquals('#kitchenDisplays > option:first-child', 'value', '0');



		/*.setValue('input[type=text]', 'gatos')
		.waitForElementVisible('button[name=btnG]', 1000)
		.click('button[name=btnG]').pause(1000)
		.assert.containsText('#main', 'gato')
		.end();*/

	}
};