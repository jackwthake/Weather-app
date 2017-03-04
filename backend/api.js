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

  updateJSON();

  exports.update(10000 * 30);
}

exports.update = function(interval) {
  var fileName = './data/presets.json';
  var file = require(fileName);
  setInterval(() => {
    if(exports.v) {
      console.log('-- Update Tick -- ' + exports.time());
    }

    updateJSON();
  }, interval);
}

var updateJSON = function() {
  var fileName = './data/presets.json';
  var file = require(fileName);

  var london_c = exports.getData('london', 'metric');
  var london_f = exports.getData('london', 'imperial');

  var stockholm_c = exports.getData('stockholm', 'metric');
  var stockholm_f = exports.getData('stockholm', 'imperial');

  var paris_c = exports.getData('paris', 'metric');
  var paris_f = exports.getData('paris', 'imperial');

  // console.log(london_c);

  fs.exists(__dirname + 'data/presets.json', (err, data) => {
    // file.london[0].temp_c = london_c.main.temp;
    // file.london[0].temp_f = london_c.main.temp;
    //
    // file.stockholm[0].temp_c = stockholm_c.main.temp;
    // file.stockholm[0].temp_f = stockholm_c.main.temp;
    //
    // file.paris[0].temp_c = paris_c.main.temp;
    // file.paris[0].temp_f = paris_f.main.temp;
    //
    // fs.writeFileSync(fileName, JSON.stringify(file));
  });
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

  request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + unit + '&APPID=c8ca329ffed77ed3f76033ee9fc95d5e', function(err, res, data) {
    d = data;
    // console.log(d);
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
