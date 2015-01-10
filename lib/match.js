function Match(num, team1, team2){
  this.eventId = num;
  this.team1 = team1;
  this.team2 = team2;
  this.odds = [];
}

Match.prototype.updateOdds = function(odds) {
  this.odds.push(odds);
};

module.exports = Match;

