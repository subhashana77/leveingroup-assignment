const { Sequelize } = require('sequelize');
const constants = require("./../const/constants");

module.exports = new Sequelize(constants.MYSQL_CONNECTION_STRING);
