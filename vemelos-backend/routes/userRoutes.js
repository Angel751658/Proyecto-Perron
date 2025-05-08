const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUsers
} = require('../controllers/userController');

// Registro
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Obtener todos los usuarios (puede protegerse más adelante con middleware de admin)
router.get('/', getUsers);

module.exports = router;
