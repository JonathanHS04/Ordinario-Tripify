const Task = require('./tasksModel');
const Trip = require('./tripsModel');
const Location = require('./locationsModel');
const User = require('./usersModel');

Location.hasMany(Trip, { foreignKey: 'locationId' });
Trip.belongsTo(Location, { foreignKey: 'locationId' });

Location.hasMany(Task, { foreignKey: 'locationId' });
Task.belongsTo(Location, { foreignKey: 'locationId' });

module.exports = {
    Task,
    Trip,
    Location,
    User
};