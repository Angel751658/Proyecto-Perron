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

router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
