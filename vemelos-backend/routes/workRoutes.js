const express = require('express');
const router = express.Router();
const {
    createWork,
    getAllWorks,
    getWorkById,
    updateWork,
    deleteWork
} = require('../controllers/workController');

// Obtener todas las obras
router.get('/', getAllWorks);

// Obtener una obra por ID
router.get('/:id', getWorkById);

// Crear nueva obra
router.post('/', createWork);

// Editar obra
router.put('/:id', updateWork);

// Eliminar obra
router.delete('/:id', deleteWork);

module.exports = router;
