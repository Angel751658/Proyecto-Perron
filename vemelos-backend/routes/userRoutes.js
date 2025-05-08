const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUsers
} = require('../controllers/userController');

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Ruta pública
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida (solo admin puede ver todos los usuarios)
router.get('/', isAuthenticated, isAdmin, getUsers);

module.exports = router;

