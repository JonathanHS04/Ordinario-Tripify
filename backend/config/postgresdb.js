const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgresql://postgres:BLKZCtR725UTGRp1@db.btjujixfkfxbyiqedyds.supabase.co:5432/postgres");

module.exports = sequelize;

