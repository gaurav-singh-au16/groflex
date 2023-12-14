const express = require('express');
const { getUser } = require('../controllers/user.controller');

const Router = express.Router
const route = Router();

// users

route.get('/api/users', getUser)


module.exports = route