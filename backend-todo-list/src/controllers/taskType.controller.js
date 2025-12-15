const TaskType = require('../models/TaskType');

const getTaskTypes = async (req, res) => {
    try {
        const userId = req.userId;
        // Obtener tipos globales (createdBy: null) y tipos del usuario actual
        const taskTypes = await TaskType.find({ 
            $or: [
                { createdBy: null }, 
                { createdBy: userId }
            ] 
        }).sort({ name: 1 });
        res.json(taskTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Vulnerabilidad 3: FALTA DE AUTORIZACIÓN (IDOR - Insecure Direct Object Reference)
// Cambio: Agregar validación de autorización en createTask() antes de usar type; validar que type pertenezca a usuario o sea global

const creatreTaskType = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        if (!name) {
            return res.status(400).json({ message: 'El nombre es obligatorio' });
        }
        const normalizedName = name.trim().toLowerCase();
        const existingType = await TaskType.findOne({
            name: normalizedName,
            $or: [{ createdBy: null }, { createdBy: userId }]
        });
        if (existingType) {
            return res.status(400).json({ message: 'El tipo de tarea ya existe' });
        }
        const newTaskType = new TaskType({
            name: normalizedName,
            createdBy: userId
        });
        await newTaskType.save();
        res.status(201).json(newTaskType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getTaskTypes, creatreTaskType };
