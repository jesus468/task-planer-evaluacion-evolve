const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    nameGroup: {
        type: String,
        required : true,
        unique : true
    },
    taskGroup: [{
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
    }]
})

const Task = mongoose.model('Task', taskSchema);

module.exports = {Task, taskSchema};