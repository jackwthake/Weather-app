// reqs
var express = require('express');
var api = require('./backend/api')

api.startup();

// express
var app = express();

// Render Engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// setup / specify routes
app.get('/', function(req, res) {
  console.log('-- Server request recieved at ' + api.time() + ' on localhost:' + api.port);
  res.render('index.ejs');
});

app.get('/data/presets', function(req, res) {
  res.sendFile(__dirname + '/backend/data/presets.json');
});

app.listen(api.port, () => {
  console.log('-- Server started at ' + api.time() + ' on localhost:' + api.port);
});
