var request = require('request');

exports.port = 8000; // default
exports.v = false; //verbosity of the apps console

exports.startup = function() {
  args = [];
  process.argv.forEach((val, index) => {
    args.push(val);
  });

  processArgs();
}

exports.update = function(interval) {
  setInterval(() => {
    if(exports.debug) {
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

exports.getData = function(city, unit){
  // unit must be either 'metric' => celsius or 'imperial' => fahrenheit.
  var d;
  request({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=" + 'metric' + "APPID=e29180ef5bc7f2c0b9b002c45a316a23",
    type: 'GET',
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
  }, function(error, response, data) {
    d = data;

    if(exports.v) {
      if(error != null) {
        console.log(error);
      }

      console.log(data);
    }
  });

  return d;
}

exports.time = function() {
  var d = new Date();
  d.getHours();
  d.getMinutes();
  d.getSeconds();

  return d.toTimeString();
}
