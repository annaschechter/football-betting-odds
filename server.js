var app = require('express')();
var server = require('http').Server(app);
var request = require('request');
var config = require('./config');
var Odds = require('./lib/odds');
var Match = require('./lib/match');

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
  return options;
}

app.get('/matches', function(req, res) {
  var data = { "filter": {"eventTypeIds": [1], "inPlayOnly": true, "marketTypeCodes": ["MATCH_ODDS"]} };
  var options = setOptions(data, "listEvents/");

  request.post(options, function(err, res1) {
    if(err) console.log(err)
    else res.send(res1.body);
  });
});

var match = new Match();
app.get('/getMarketId/:matchId/:matchName', function(req, res) {
  match.eventId = req.params.matchId;
  match.team1 = req.params.matchName.split('v')[0];
  match.team2 = req.params.matchName.split('v')[1];
  var data = { "filter": {"eventIds": [match.eventId], "marketTypeCodes": ["MATCH_ODDS"]}, "maxResults": "1" };
  var options = setOptions(data, "listMarketCatalogue/");
  
  request.post(options, function(err, res1) {
    if(err) console.log(err);
    else res.send(res1.body[0].marketId);
  });
});

app.get('/getOdds/:marketId', function(req, res) {
  var marketId = req.params.marketId;
  var data1 = {
    "marketIds": [marketId],
    "maxResults": "20"  
  };
  var options1 = setOptions(data1, "listMarketBook/");
  request.post(options1, function(err, res1) {
    if(err) {
      console.log(err)
    } else {
      if(res1.body[0].status == "OPEN") {
        var odds = new Odds(res1.body[0].runners[0].lastPriceTraded, 
                            res1.body[0].runners[1].lastPriceTraded,
                            res1.body[0].runners[2].lastPriceTraded);
        match.updateOdds(odds);
        res.send(odds);
      } else {
        var odds = new Odds(0, 0, 0);
        match.updateOdds(odds);
        res.send(odds);
      }
    }
  });
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
})