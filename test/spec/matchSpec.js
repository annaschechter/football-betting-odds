var Match = require('../../lib/match.js');

describe("Match", function() {

  var match;
  var odds;
  beforeEach(function(){
    match = new Match(27340168, "Espanyol", "Barcelona");
    odds = {};
  });

  it("knows it's betfair event id", function() {
    expect(match.eventId).toEqual(27340168);
  });

  it("knows the name of the home team", function() {
    expect(match.team1).toEqual("Espanyol");
  });

  it("knows the name of the away team", function() {
    expect(match.team2).toEqual("Barcelona");
  });

  it("can store the odds", function() {
    expect(match.odds.length).toEqual(0);
  });

  it("can record odds", function() {
    match.updateOdds(odds);
    expect(match.odds.length).toEqual(1)
  });

})