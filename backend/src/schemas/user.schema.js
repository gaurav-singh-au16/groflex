const { DataTypes } = require('sequelize');
const db = require('../helpers/db.helper')


const User = db.define('users', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '0=>Male, 1=>female'
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    interest: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '0=>reading, 1=>writing, 2=>travelling, 3=>playing'
    },
    profile_image: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: db,
    }
)

module.exports = User