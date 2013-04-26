/**
 * toolbox to pilot gmvault
 */

'use strict';

 var fs             = require('fs');
 
 //var gmvaultPath    = '/Users/gaubert/gmvault-v1.8.1/bin/gmvault';
 var gmvaultPath    = '/home/aubert/test_echo.sh';
 
 
 var $              = global.jQuery;

 var cpt            = 0;
 
// extends String object
String.prototype.beginsWith = function (string) {
    return(this.indexOf(string) === 0);
};
 
 /**
  * run the gmvault command
  * @param {type} verb
  * @param {type} args 
  * @returns {@exp;gmv@pro;pid}
  */
 function run(verb, args) {
     
     var spawn = require('child_process').spawn;
     
     var params = [verb].concat(args);
 
     //var gmv   = spawn('gmvault', params);
     var gmv   = spawn(gmvaultPath, params);

     gmv.stdout.on('data', function (data) {
         global.debug('========= stdout: ' + data);
		 var out = data.toString();
         var val = $("#mTextArea").val();
		 var lines = out.split("\n")
		 var res = "";
		 for (var i=0; i < lines.length; i++) {
           if (lines[i].indexOf('[gmv-msg]:') === 0) {
		       res = "[MSG-JS]:" + lines[i].substring(10) + "\n" + res;
           }
		 }
         $("#mTextArea").val(res + val); 
			
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
            global.debug('gmvault_cmd.run[exit event]:' + code + " signal=" + signal);
        });
        
        
     return gmv.pid;
 
 }
 
 exports.run = run;
