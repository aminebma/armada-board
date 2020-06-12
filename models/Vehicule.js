/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vehicule', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Marque: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Modele: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Matricule_interne: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Matricule_externe: {
      type: DataTypes.CHAR,
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
    tableName: 'Vehicule'
  });
};
