const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskType',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dateCompleted: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
