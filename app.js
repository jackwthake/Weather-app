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

// api.getData('portland');

// setup / specify routes
app.get('/', function(req, res) {
  console.log('Server request recieved at ' + api.time() + ' on localhost:' + api.port);
  res.render('index.ejs');
});

app.get('/data/presets', function(req, res) {
  res.send('/data/presets.json')
});

/*
  NOTE:
  The Client should request weather data by going:
  localhost:8000/q={{city name}}
  then the server goes and searches the city on open weather map
  and sends the data back to the client.
*/

app.listen(api.port, () => {
  console.log('Server started at ' + api.time() + ' on localhost:' + api.port);
});

api.update(5000);
