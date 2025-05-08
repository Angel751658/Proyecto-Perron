const User = require('../models/User');

// Middleware para verificar si el usuario está autenticado (versión simple sin tokens)
const isAuthenticated = async (req, res, next) => {
    const email = req.header('x-user-email');

    if (!email) {
        return res.status(401).json({ msg: 'Falta encabezado de autenticación' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(403).json({ msg: 'Usuario no válido' });
    }

    req.user = user; // se guarda el usuario en la request
    next();
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ msg: 'Acceso denegado: no eres administrador' });
    }
    next();
};

module.exports = { isAuthenticated, isAdmin };
