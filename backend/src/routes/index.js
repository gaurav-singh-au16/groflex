const express = require('express');
const { getUser, registerUser, updateUser, removeUser } = require('../controllers/user.controller');

const Router = express.Router
const route = Router();

// users

route.get('/api/users', getUser)
route.post('/api/register', registerUser)
route.put('/api/users', updateUser)
route.delete('/api/users', removeUser)




module.exports = route