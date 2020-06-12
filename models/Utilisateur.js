/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Username: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR,
      allowNull: false
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
      type: ""CHAR"",
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
    tableName: 'Utilisateur'
  });
};
