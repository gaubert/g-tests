/**
 * Application initialization
 */

'use strict';

 var fs             = require('fs');
	/* appConfig      = require('./appConfig.js'), */
	/* storage        = require('./storage.js'), */
	/* jadeManager    = require('./jadeManager.js'), */
	/* fileWatcher    = require('./fileWatcher.js'), */
	/* projectManager = require('./projectManager.js'), */
	/* notifier       = require('./notifier.js'), */
	/* util           = require('./util.js'); */

/* var	historyDb      = storage.getHistoryDb(), */
 var $              = global.jQuery;

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
		notifier.throwAppError(e.stack);
	});
	
	//rander main window view
	renderMainWindow();
	
	global.debug("ui loaded ? " + $.ui.version + " End.");
	global.debug("IN init of initialization");
	
	$("#divButton").button();
	
	$("#divButton").click(function (event) {
	    global.debug("on div buttonclick");
	    var spawn = require('child_process').spawn,
                    ls    = spawn('ls', ['-lh', '/usr']);

        ls.stdout.on('data', function (data) {
            global.debug('stdout: ' + data);
        });

        ls.stderr.on('data', function (data) {
            global.debug('stderr: ' + data);
        });

        ls.on('close', function (code) {
            global.debug('child process exited with code ' + code);
        });
	});
	
	$('button').button();
	
	$("button").click(function (event) {
	    global.debug("on hello button click");
	});

    /*$("input[type=submit], button" ).button()
      .click(function( event ) {
	    global.debug("click");
        event.preventDefault();
      });
	  */
	
	

	mainWindow.show();
}
