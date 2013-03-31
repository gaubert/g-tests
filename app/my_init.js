/**
 * Application init tests
 */

'use strict';

var  $  = global.jQuery;
var fs  = require('fs');

var init = function init() {

    global.debug("In init of my_init.js");
    
    // get button
    var myButton = $('button').button();
	
    myButton.click(function (event) {
	    global.debug("in my init click");
    });
}

exports.init = init;