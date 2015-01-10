var app = require('express')();
var server = require('http').Server(app);
var request = require('request');
var config = require('./config');

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(require('express').static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

var setOptions = function(data, route) {
  var options = {
    url: 'https://api.betfair.com/exchange/betting/rest/v1.0/'+route,
    method: 'post',
    headers: {
      'X-Application' : config.appId, 
      'X-Authentication' : config.sessionId, 
      'Content-Type' : 'application/json',
      'Accept': 'application/json', 
    },
    body: data,
    json: true,
  }
  console.log(options);
  return options;
}

app.get('/matches', function(req, res) {
  var data = { "filter": {"eventTypeIds": [1], "inPlayOnly": true} };
  var options = setOptions(data, "listEvents/");

  request.post(options, function(err, res1) {
    if(err) console.log(err)
    else res.send(res1.body);
      console.log(res1.body);
  });
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
})