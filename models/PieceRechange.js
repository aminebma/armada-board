/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PieceRechange', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Marque: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Modele: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Quantite: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'PieceRechange'
  });
};
