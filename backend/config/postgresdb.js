const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Cerotes123', {
  host: 'db.btjujixfkfxbyiqedyds.supabase.co',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

module.exports = sequelize;

