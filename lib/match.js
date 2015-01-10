function Match(num, team1, team2){
  this.eventId = num || null;
  this.team1 = team1 || null;
  this.team2 = team2 || null;
  this.odds = [];
}

Match.prototype.updateOdds = function(odds) {
  this.odds.push(odds);
};

module.exports = Match;

