//importar modelos 
//const { taskSchema , Task} = require('../models/taskModels');
const {Task} = require('../config/dataBase');

const getAllTasks = async () => {
    try {
        const res = await Task.find();
        console.log(res);
        //console.log('Task successfully:', res);
        return res;
    } catch (error) {
        console.log('Error getting tasks, error:', error);
        throw error;
    }finally{
        console.log('getAllTasks finallized');
    }
}

const addTasks = async (id, taskData) => {
    try {
        const task = Task.findByIdAndUpdate(id , taskData, { 
                new: true,
                runValidators: true 
            })
        
        if (!task) {
            throw new Error('task no found');
        }

        console.log('task updated:', task);
        return task;


    } catch (error) {
        console.log('task couldnt be added, error:', error);
        throw error;
    }finally{
        console.log('getAllTasks finallized');
    }
}

const deleteTask = async (id, taskData) => {
    try {
        const task = Task.findByIdAndUpdate(id , taskData, { 
                new: true,
                runValidators: true 
            })
        
        if (!task) {
            throw new Error('delete task no found');
        }

        console.log('delete task updated:', task);
        return task;


    } catch (error) {
        console.log('task couldnt be deleted, error:', error);
        throw error;
    }finally{
        console.log('task deleted finallized');
    }
}
const deleteGroup = async (id) => {
    try {
        const task = Task.findByIdAndDelete(id)
        
        if (!task) {
            throw new Error('task no found');
        }

        console.log('group deleted:', task);
        return task;

    } catch (error) {
        console.log('Group couldnt be deleted, error:', error);
        throw error;
    }finally{
        console.log('delete group finallized');
    }
}
const createGroup = async (taskData) => {
    try {
        const group = Task.insertOne(taskData);
        console.log('group created:', group);
        return group;


    } catch (error) {
        console.log('group couldnt be added, error:', error);
        throw error;
    }finally{
        console.log('create group finallized');
    }
}
module.exports = {getAllTasks, addTasks, deleteTask, deleteGroup, createGroup} ;