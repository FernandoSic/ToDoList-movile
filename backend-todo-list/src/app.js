const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const taskTypeRoutes = require('./routes/taskType.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Cors
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/task-types', taskTypeRoutes);

module.exports = app;