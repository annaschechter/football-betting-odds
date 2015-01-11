module.exports = function(sequelize, DataTypes) {
  var Odds = sequelize.define("Odds", {
    team1Win: DataTypes.FLOAT,
    team1Loose: DataTypes.FLOAT,
    draw: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Odds.belongsTo(models.Match);
      }
    }
  });

  return Odds;
};