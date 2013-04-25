/**
 * toolbox to pilot gmvault
 */

'use strict';

 var fs             = require('fs');
 
 var gmvaultPath    = '/Users/gaubert/gmvault-v1.8.1/bin/gmvault';
 
 
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
 
     var gmv   = spawn('gmvault', params);

        gmv.stdout.on('data', function (data) {
            global.debug('stdout: ' + data.constructor.name);
            var val = $("#mTextArea").val();
            $("#mTextArea").val(val + data);
            if (data.indexOf('[gmv-msg]:') === 0) {
                
               $("#mTextArea").val('[MSG in JS]:' + data.substring(10) + val); 
                
            }
            
			
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
