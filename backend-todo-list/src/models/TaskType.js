const mongoose = require('mongoose');

const TaskTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
        }
}, { timestamps: true });

TaskTypeSchema.index(
    { name: 1, createdBy: 1 },
    { unique: true }
);

module.exports = mongoose.model('TaskType', TaskTypeSchema);

