const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  setAdminRole,
  revokeAdminRole,
  addFavorite,
  removeFavorite
} = require('../controllers/userController');

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Ruta para obtener el usuario actual
router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const email = req.headers['x-user-email'];
    const usuario = await require('../models/User').findOne({ email });
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registro e inicio de sesión
router.post('/register', registerUser);
router.post('/login', loginUser);

// Acceso para administradores
router.get('/', isAuthenticated, isAdmin, getUsers);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);
router.put('/:id/admin', isAuthenticated, isAdmin, setAdminRole);
router.put('/:id/revoke', isAuthenticated, isAdmin, revokeAdminRole);

// Funciones de favoritos
router.put('/favorites/add', isAuthenticated, addFavorite);
router.put('/favorites/remove', isAuthenticated, removeFavorite);

module.exports = router;
