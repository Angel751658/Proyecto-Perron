const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: String,
    genero: String,
    descripcion: String,
    imagenUrl: String,
    compraLink: String
});

module.exports = mongoose.model('Work', workSchema);
