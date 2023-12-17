const express = require('express');
const { getUser, registerUser, updateUser, removeUser } = require('../controllers/user.controller');
const { login, forgotPassword } = require('../controllers/auth.controler');
const authenticateToken = require('../middlewares/access.middleware');

const Router = express.Router
const route = Router();

// users

route.get('/api/users', authenticateToken, getUser)
route.post('/api/register', registerUser)
route.put('/api/update-user',authenticateToken, updateUser)
route.delete('/api/delete-user/:id',authenticateToken, removeUser)

// auth

route.post('/api/login', login)
route.put('/api/forgot-password', forgotPassword)


module.exports = route