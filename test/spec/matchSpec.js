var Match = require('../../lib/match.js');

describe("Match", function() {

  var match;
  beforeEach(function(){
    match = new Match(27340168, "Espanyol", "Barcelona");
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




})