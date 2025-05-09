const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    dateTask: {
        type: Date,
        required: true,
        default: Date.now
    },
    priority: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;