const Sequelize = require('sequelize');

// Initialisation de Sequelize avec les paramètres de votre base de données
const sequelize = new Sequelize('ecole_api', 'root', 'Fac2medCine', {
  host: 'localhost',
  dialect: 'mysql',
});

// Importation et initialisation des modèles
const Student = require('../models/student')(sequelize, Sequelize.DataTypes);
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

// Synchronisation des modèles avec la base de données
sequelize
  .sync({ force: false }) // `force: false` pour ne pas supprimer/re-créer les tables existantes
  .then(() => console.log('La base de données à bien été synchronisée'))
  .catch((error) => console.error('Problème lors de la synchronisation :', error.message));

module.exports = {
  sequelize,
  Student,
  User,
};
