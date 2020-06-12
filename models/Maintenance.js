/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Maintenance', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Niveau: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Echelon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Vehicule: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Vehicule',
        key: 'id'
      }
    },
    Interventions: {
      type: "XML",
      allowNull: false
    }
  }, {
    tableName: 'Maintenance'
  });
};
