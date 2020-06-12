/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Panne', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Vehicule: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Vehicule',
        key: 'id'
      }
    },
    Code: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Type: {
      type: DataTypes.CHAR,
      allowNull: false
    }
  }, {
    tableName: 'Panne'
  });
};
