var request = require('request');
var fs = require('fs');

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
    if(exports.v) {
      console.log('-- Update Tick -- ' + exports.time());
    }
    var london_c = exports.getData('london', 'metric');
    var london_f = exports.getData('london', 'imperial');

    var stockholm_c = exports.getData('stockholm', 'metric');
    var stockholm_f = exports.getData('stockholm', 'imperial');

    var paris_c = exports.getData('paris', 'metric');
    var paris_f = exports.getData('paris', 'imperial');

    fs.exists(__dirname + 'data/presets.json', (err, data) => {
      if(err) {
        console.log(err)
      } else {
        // var obj = JSON.parse(data);
        console.log(data);
      }
    });
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
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=" + unit + "APPID=c8ca329ffed77ed3f76033ee9fc95d5e",
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
