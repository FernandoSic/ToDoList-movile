const Task = require('../models/Task');
const TaskType = require('../models/TaskType');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.userId})
            .populate('type')
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const detailTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            _id: id,
            userId: req.userId
        }).populate('type');
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, type } = req.body;
        const newTask = new Task({
            title,
            description,
            type,
            completed: false,
            dateCompleted: null,
            userId: req.userId
        });
        await newTask.save();
        res.status(201).json({message: 'Tarea creada exitosamente', task: newTask});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const completedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            _id: id,
            userId: req.userId
        });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        task.completed = true;
        task.dateCompleted = new Date();

        await task.save();

        res.json({ message: 'Tarea marcada como completada', task });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }  
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({
            _id: id,
            userId: req.userId
        });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { createTask, completedTask, getTasks, detailTask, deleteTask };
