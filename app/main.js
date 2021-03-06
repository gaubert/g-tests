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

//Application initialization
require('./app/initialization.js').init();
