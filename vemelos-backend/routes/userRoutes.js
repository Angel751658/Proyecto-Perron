const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUsers
} = require('../controllers/userController');

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Registro público
router.post('/register', registerUser);

// Login público
router.post('/login', loginUser);

// Obtener todos los usuarios (solo admin autenticado)
router.get('/', isAuthenticated, isAdmin, getUsers);

module.exports = router;
