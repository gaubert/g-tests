/**
 * toolbox to pilot gmvault
 */

'use strict';

 var fs             = require('fs');
 
 var gmvaultPath    = '/Users/gaubert/gmvault-v1.8.1/bin/gmvault';
 
 
 var $              = global.jQuery;
 
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
            global.debug('stdout: ' + data);
        });

        gmv.stderr.on('data', function (data) {
            global.debug('stderr: ' + data);
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