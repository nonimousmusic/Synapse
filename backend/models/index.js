const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'synapse.sqlite'),
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./User')(sequelize, DataTypes);
db.Progress = require('./Progress')(sequelize, DataTypes);

// Relations
db.User.hasOne(db.Progress, { foreignKey: 'userId' });
db.Progress.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
