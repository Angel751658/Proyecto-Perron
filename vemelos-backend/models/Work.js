const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: String,
  genero: String,
  descripcion: String,
  imagenUrl: String,
  compraLink: String,
  isbn: String,
  idioma: String,
  numeroPaginas: Number,
  coleccion: String,
  numeroColeccion: Number
});

module.exports = mongoose.model('Work', workSchema);