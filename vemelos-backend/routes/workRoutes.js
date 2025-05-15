const express = require('express');
const router = express.Router();
const {
    createWork,
    getAllWorks,
    getWorkById,
    updateWork,
    deleteWork
} = require('../controllers/workController');

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Públicas
router.get('/', getAllWorks);
router.get('/:id', getWorkById);

// Protegidas (solo admin)
router.post('/', isAuthenticated, isAdmin, createWork);
router.put('/:id', isAuthenticated, isAdmin, updateWork);
router.delete('/:id', isAuthenticated, isAdmin, deleteWork);

module.exports = router;

 