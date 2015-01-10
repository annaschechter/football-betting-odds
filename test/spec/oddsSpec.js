var Odds = require('../../lib/odds.js');

describe("Odds", function() {

  var odds;
  beforeEach(function(){
    odds = new Odds(1.23, 13.6, 5);
  });

  it('odds know the price for team1 to win', function() {
    expect(odds.team1Win).toEqual(1.23);
  });

  it('odds know the price for team1 to loose', function() {
    expect(odds.team1Loose).toEqual(13.6);
  });

  it('odds know the price for a draw', function() {
    expect(odds.draw).toEqual(5);
  });

  it('odds know the time they were recorded at', function() {
    expect(odds.recordedAt instanceof Date).toBe(true);
  })

}); 