const sequelizeInstance = require('./../database/sequelise-instance')
const { DataTypes } = require("sequelize");
const Post = require('./post');

module.exports = sequelizeInstance.define('comment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    postId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    comment: {
        type: DataTypes.STRING
    }
});
