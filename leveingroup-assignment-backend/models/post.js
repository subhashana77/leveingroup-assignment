const sequelizeInstance = require('./../database/sequelise-instance')
const { DataTypes } = require("sequelize");

module.exports = sequelizeInstance.define('post', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING
    },
    caption: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
});
