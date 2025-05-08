const Work = require('../models/Work');

// Crear nueva obra
exports.createWork = async (req, res) => {
    try {
        const obra = new Work(req.body);
        await obra.save();
        res.status(201).json({ msg: 'Obra creada correctamente', obra });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todas las obras
exports.getAllWorks = async (req, res) => {
    try {
        const obras = await Work.find();
        res.json(obras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una obra por ID
exports.getWorkById = async (req, res) => {
    try {
        const obra = await Work.findById(req.params.id);
        if (!obra) return res.status(404).json({ msg: 'Obra no encontrada' });
        res.json(obra);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Editar obra
exports.updateWork = async (req, res) => {
    try {
        const obra = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: 'Obra actualizada', obra });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar obra
exports.deleteWork = async (req, res) => {
    try {
        await Work.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Obra eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
