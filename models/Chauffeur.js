/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Chauffeur', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Nom: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Prenom: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    DateNaiss: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Adresse: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Sexe: {
      type: DataTyoes.CHAR,
      allowNull: false
    },
    Affectation: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Unite',
        key: 'id'
      }
    }
  }, {
    tableName: 'Chauffeur'
  });
};
