/**
 * Application initialization
 */

'use strict';

 var fs              = require('fs');
 var gmvault_command = require('./gmvault_command.js');
 
	/* appConfig      = require('./appConfig.js'), */
	/* storage        = require('./storage.js'), */
	/* jadeManager    = require('./jadeManager.js'), */
	/* fileWatcher    = require('./fileWatcher.js'), */
	/* projectManager = require('./projectManager.js'), */
	/* notifier       = require('./notifier.js'), */
	/* util           = require('./util.js'); */

/* var	historyDb      = storage.getHistoryDb(), */
 var $              = global.jQuery;
 var data           = {};

//share global context
/* global.appConfig = appConfig; */

//just for debug
/*if (appConfig.getAppPackage().appinfo.debug) {
	global.storage = storage;
	global.fileWatcher = fileWatcher;
	global.notifier = notifier;
	global.projectManager = projectManager;
}
*/

/**
 * render main window view
 */
function renderMainWindow () {
	var targetMainPage = process.cwd() + '/html/main.html';

	var html = fs.readFileSync(targetMainPage, 'utf8');

	$('#window').append(html);
}

exports.init = function() {
	//Add error event listener
	process.on('uncaughtException', function(e) {
		mainWindow.show();
		//notifier.throwAppError(e.stack);
                global.debug("Exception:" + e.stack);
	});
	
	//render main window view
	renderMainWindow();
	
	global.debug("ui loaded ? " + $.ui.version + " End.");
	global.debug("IN init of initialization");
	
	// create buttons
	$("#runButton").button();
	$("#stopButton").button();
	
	$("#runButton").click(function (event) {
	    global.debug("on runButton click");
	    var pid = gmvault_command.run("sync", ["guillaume.aubert@gmail.com", "--chats-only", "-c", "no"]);
		data['pid'] = pid;
		global.debug("pid = " + data['pid']);
	});

	$("#stopButton").click(function (event) {
	    global.debug("on stopButton click");
		gmvault_command.stop(data['pid']);
	});

	mainWindow.show();
}
