/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Fichier', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Contenu: {
      type: "XML",
      allowNull: false
    }
  }, {
    tableName: 'Fichier'
  });
};
