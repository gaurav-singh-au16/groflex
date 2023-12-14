const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

// const sequelize = new Sequelize(process.env.POSTGRES_URL+ "?sslmode=require", {
//     dialectModule: require('pg')})

module.exports = sequelize