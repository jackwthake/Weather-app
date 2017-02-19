exports.port = 3000; // default

exports.startup = function() {
  args = [];
  process.argv.forEach((val, index) => {
    args.push(val);
  });

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
