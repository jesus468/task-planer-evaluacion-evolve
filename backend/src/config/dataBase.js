const mongoose = require('mongoose');
const { taskSchema} = require('../models/taskModels')

const conn = mongoose.createConnection(`mongodb+srv://enmanueljesusjv:nhAbZk2ppNfjL7bR@cluster0.ytimgra.mongodb.net/TaskPlanner?retryWrites=true&w=majority&appName=Cluster0`);
const Task = conn.model('Task', taskSchema);

conn.on('connected', ()=> {
    console.log('conectado correctamente');
})

/*
const connectDB = async () => {    
    try {
        

        console.log(`Connect Success, connected to TaskPlanner DB`);
    } catch (error) {
        console.log('Cant connect with DB', error);
        process.exit(1);
    }
}
*/
module.exports = {conn, Task} ;