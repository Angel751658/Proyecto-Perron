const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { user, email, password } = req.body;

    try {
        const existe = await User.findOne({ email });
        if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            user,
            email,
            password: hashed,
        });

        await nuevoUsuario.save();
        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

        const valido = await bcrypt.compare(password, usuario.password);
        if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

        res.status(200).json({ msg: 'Login exitoso', usuario });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los usuarios (opcional para admin)
exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find().select('-password');
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("🔍 Intentando eliminar usuario con ID:", id);

        // Validar ID de MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.warn("⚠️ ID inválido");
            return res.status(400).json({ msg: 'ID de usuario inválido' });
        }

        const eliminado = await User.findByIdAndDelete(id);

        if (!eliminado) {
            console.log("❌ Usuario no encontrado");
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        console.log("✅ Usuario eliminado:", eliminado.email);
        res.json({ msg: 'Usuario eliminado correctamente' });

    } catch (err) {
        console.error("❗ Error eliminando usuario:", err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.setAdminRole = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        const actualizado = await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });

        if (!actualizado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({ msg: 'Rol de administrador asignado', usuario: actualizado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeAdminRole = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID inválido' });
        }

        const actualizado = await User.findByIdAndUpdate(id, { isAdmin: false }, { new: true });

        if (!actualizado) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json({ msg: 'Rol de administrador eliminado', usuario: actualizado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};