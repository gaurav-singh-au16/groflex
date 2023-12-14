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
    gender: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '0=>Male, 1=>female'
    },
    dob: {
        type: DataTypes.DATE,
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
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: '0=>reading, 1=>writing, 2=>travelling, 3=>playing'
    },
    profile_image: {
        type: DataTypes.BLOB,
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