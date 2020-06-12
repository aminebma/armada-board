/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlanningMaintenance', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ListeMaintenances: {
      type: "XML",
      allowNull: false
    }
  }, {
    tableName: 'PlanningMaintenance'
  });
};
