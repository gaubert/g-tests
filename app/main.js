/**
 * main.js
 */

'use strict'; 

/**
 * render main window view
 */
function renderMainWindow () {
	var targetMainPage = process.cwd() + '/html/main.html';

	var html = fs.readFileSync(targetMainPage, 'utf8');

	$('#window').append(html);
}


//share main context
var gui = require('nw.gui'); 
global.gui = gui;
global.mainWindow = gui.Window.get();
global.jQuery = jQuery;
global.debug = function(messge) {
	global.mainWindow.window.console.log(messge);
};

//cache current active project 
global.activeProject = '';

//distinguish between different platforms
$('body').addClass(process.platform);

// added for testing
var fs             = require('fs');

	//Add error event listener
	process.on('uncaughtException', function(e) {
		global.mainWindow.show();
		notifier.throwAppError(e.stack);
	});
	
	global.debug("ui loaded ? " + $.ui.version + " End.");
	global.debug("IN init of initialization");
	
	var button = $("#divButton").button();
	
	button.click(function (event) {
	    global.debug("divButton click");
	});
	
	$('button').button();
	
	$("button").click(function (event) {
	    global.debug("on button click");
	});

    /*$("input[type=submit], button" ).button()
      .click(function( event ) {
	    global.debug("click");
        event.preventDefault();
      });
	  */
	
	//rander main window view
	renderMainWindow();

	global.mainWindow.show();

require('./app/my_init.js').init();
//Application initialization
//require('./app/initialization.js').init();
