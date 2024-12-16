const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    Image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Product;