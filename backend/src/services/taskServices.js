//importar modelos 
const Task = require('../models/taskModels');

const getAllTasks = async () => {
    try {
        const res = await Task.find();
        console.log('Task successfully:', res);
        return res;
    } catch (error) {
        console.log('Error getting tasks, error:', error);
        throw error;
    }finally{
        console.log('getAllTasks finallized');
    }
}
/*
const addTasks = async (taskData) => {
    try {
        const task = new Task(taskData);
        const res = await task.save();
        console.log('Task added successfully:', res);
        return res;
    } catch (error) {
        console.log('task couldnt be added, error:', error);
        throw error;
    }finally{
        console.log('getAllTasks finallized');
    }
}*/

module.exports = {getAllTasks} ;