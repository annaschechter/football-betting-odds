module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    eventId: DataTypes.INTEGER,
    team1: DataTypes.STRING,
    team2: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Match.hasMany(models.Odds);
      }
    }
  });

  return Match;
};