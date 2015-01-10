function Odds(x, y, z){
  this.team1Win = x;
  this.team1Loose = y;
  this.draw = z;
  this.recordedAt = new Date();
}

module.exports = Odds;