var request = require('request');

exports.port = 8000; // default
exports.v = false; //verbosity of the apps console

exports.startup = function() {
  args = [];
  process.argv.forEach((val, index) => {
    args.push(val);
  });

  processArgs();
  exports.update(60000 * 10);
}

exports.update = function(interval) {
  setInterval(() => {
    if(exports.v) {
      console.log('-- Update Tick -- ' + exports.time());
    }
  }, interval);
}

var processArgs = function() {
  if(exports.find('verbose', args)) {
    exports.v = true; 
  }

  if(exports.find('port', args)) {
    var p = args[exports.find('port', args)];
    exports.port = p.match(/\d+$/)[0];
  }
}

// utils
exports.find = function(val, array) {
  for (var i = 0; i < array.length; i++) {
    if(array[i].indexOf(val) > -1)
      return i;
  }
}

exports.time = function() {
  var d = new Date();
  d.getHours();
  d.getMinutes();
  d.getSeconds();

  return d.toTimeString();
}
