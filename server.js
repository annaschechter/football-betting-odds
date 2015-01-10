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
  });
});

app.get('/getMarketId/:matchId', function(req, res) {
  var matchId = req.params.matchId;
  console.log(matchId);
  var data = { "filter": {"eventIds": [matchId], "marketName": "Match Odds"}, "maxResults": "999" };
  var options = setOptions(data, "listMarketCatalogue/");
  
  request.post(options, function(err, res1) {
    if(err) {
      console.log(err);
      return err;
    } else {
      console.log(res1.body);
      res1.body.forEach(function(market) {
        if(market.marketName == "Match Odds") {
          console.log(market.marketId);
          res.send(market.marketId);
        }
      });
    }
  });
})

app.get('/getOdds/:marketId', function(req, res) {
  var marketId = req.params.marketId;
  var data1 = {
    "marketIds": [marketId],
    "maxResults": "20"  
  };
  console.log(data1);
  var options1 = setOptions(data1, "listMarketBook/");
  request.post(options1, function(err, res1) {
    if(err) {
      console.log(err)
    } else {
      console.log(res1.body)
      if(res1.body[0].status == "OPEN") {
        var odds = {"win":res1.body[0].runners[0].lastPriceTraded, "loose":res1.body[0].runners[1].lastPriceTraded, "draw":res1.body[0].runners[2].lastPriceTraded}
        console.log(odds);
        res.send(odds)
      } else {
        res.send(null)
      }
    }
  });
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
})