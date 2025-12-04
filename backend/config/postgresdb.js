const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
    family: 4
  }
});


module.exports = sequelize;

