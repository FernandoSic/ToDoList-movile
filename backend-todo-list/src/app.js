const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const taskTypeRoutes = require('./routes/taskType.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Cors
app.use(cors({
    origin: ['http://localhost:5173', 
        'https://to-do-list-eight-kappa-30.vercel.app'],
    credentials: true
}));

// CAMBIO 4: Parsear cookies en cada request
app.use(cookieParser());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/task-types', taskTypeRoutes);

module.exports = app;