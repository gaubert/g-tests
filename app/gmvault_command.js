/**
 * toolbox to pilot gmvault
 */

'use strict';

 var fs             = require('fs');
 var common         = require('./gmv_common.js');
 
 //var gmvaultPath    = '/Users/gaubert/gmvault-v1.8.1/bin/gmvault';
 var gmvaultPath    = '/home/aubert/test_echo.sh';
 
 
 var $              = global.jQuery;
 var cpt            = 0;
 var gmv_childs     = {};
 
 /**
  * run the gmvault command
  * @param {type} verb
  * @param {type} args 
  * @returns {@exp;gmv@pro;pid}
  */
 function run(verb, args) {
     
     var spawn = require('child_process').spawn;
     
     var params = [verb].concat(args);
 
     var gmv   = spawn(gmvaultPath, params);

     gmv.stdout.on('data', function (data) {
         global.debug('========= stdout: ' + data);
		 var out = data.toString();
         var msgArea = $("#msgTextArea").val();
         var logArea = $("#logTextArea").val();
		 var lines = out.split("\n")
		 var msg = "";
		 var log = "";
		 for (var i=0; i < lines.length; i++) {
		   global.debug("line = " + lines[i]);
           if (lines[i].beginsWith('[gmv-msg]:')) {
		       msg = msg  + lines[i].substring(10) + "\n";
           }
		   else
		   {
		      log = log  + lines[i] + "\n";
		   }
		   // need to put only msg in one box and everything else in a second box
		 }
         $("#msgTextArea").val(msgArea + msg); 
         $("#logTextArea").val(logArea + log); 
			
     });

     gmv.stderr.on('data', function (data) {
            global.debug('stderr: ' + data);
            var val = $("#mTextArea").val();
			$("#mTextArea").val('[stderr]:' + data + val);
            //$("#mTextArea").val("Hello" + cpt + "//" + val);
			//cpt = cpt + 1;
        });

     gmv.on('close', function (code) {
            global.debug('gmvault_cmd.run[close event]: Exited with code ' + code);
        });
        
     gmv.on('error', function(err) {
            global.debug('gmvault_cmd.run[error event]: Received error message' + err);
        });
        
     gmv.on('exit', function(code, signal) {
            global.debug('gmvault_cmd.run[exit event]:' + code + "received signal=" + signal);
        });

	 gmv_childs[gmv.pid] = gmv ;
        
     return gmv.pid;
 
 }

 /**
  * stop the gmvault command
  * @param {type} pid 
  */
 function stop(pid) {
    // get child object
	var child = gmv_childs[pid]; 
	// add test if error

	child.kill();
 }
 
 
 exports.run  = run;
 exports.stop = stop;
