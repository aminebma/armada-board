/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Unite', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Nom: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Classe: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Affiliation: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Region: {
      type: DataTypes.CHAR,
      allowNull: false
    }
  }, {
    tableName: 'Unite'
  });
};
