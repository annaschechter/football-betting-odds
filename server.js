var app = require('express')();
var server = require('http').Server(app);
var request = require('request');
var config = require('./config');
var Odds = require('./lib/odds');
var Match = require('./lib/match');
var models = require('./models');

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(require('express').static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/matches', function(req, res) {
  var data = { "filter": {"eventTypeIds": [1], "inPlayOnly": true, "marketTypeCodes": ["MATCH_ODDS"]} };
  var options = setOptions(data, "listEvents/");

  request.post(options, function(err, res1) {
    if(err) console.log(err)
    else res.send(res1.body);
  });
});


app.get('/getMarketId/:matchId/:matchName', function(req, res) {
  var match = createNewMatch(req.params.matchId, req.params.matchName);
  addMatchToDB(match); 
  var data = { "filter": {"eventIds": [match.eventId], "marketTypeCodes": ["MATCH_ODDS"]}, "maxResults": "1" };
  var options = setOptions(data, "listMarketCatalogue/");
  
  request.post(options, function(err, res1) {
    if(err) console.log(err);
    else res.send({"marketId": res1.body[0].marketId, "matchId": match.eventId});
  });
});


app.get('/getOdds/:marketId/:matchId', function(req, res) {
  var marketId = req.params.marketId;
  var matchId = req.params.matchId;
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
        // match.updateOdds(odds);
        addOddsToDB(odds, matchId);
        res.send(odds);
      } else {
        var odds = new Odds(0, 0, 0);
        // match.updateOdds(odds);
        addOddsToDB(odds, matchId);
        res.send(odds);
      }
    }
  });
});

// methods=======================================================================
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

var createNewMatch = function(matchId, matchName) {
  var match = new Match();
  match.eventId = matchId;
  match.team1 = matchName.split(' v ')[0];
  match.team2 = matchName.split(' v ')[1];
  return match;
}

var addMatchToDB = function(match) {
  models.Match.find({where:{eventId: match.eventId}}).complete(function(err, foundMatch) {
    if(!!err) {
      console.log(err)
    } else if (!foundMatch) {
      models.Match.create({eventId: match.eventId,
                          team1: match.team1,
                          team2: match.team2
                        });
    } else {
      console.log("Match already exists!!!");
    }
  });
}

var addOddsToDB = function(odds, matchId) {
  models.Match.find({where:{eventId: matchId}}).complete(function(err, match) {
    if(!!err) {
      console.log(err)
    } else {
      models.Odds.create({team1Win: odds.team1Win,
                        team1Loose: odds.team1Loose,
                        draw: odds.draw,
                        MatchId: match.id
                      });
    }
  });  
}

module.exports = app