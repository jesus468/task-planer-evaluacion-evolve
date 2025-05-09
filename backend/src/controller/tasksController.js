//importar servicios
const { response } = require('express');
const {getAllTasks} = require('../services/taskServices');
//importar validaciones

const taskController ={
    getTasks: [
        async (req, res) =>{
            try {
                const data = await getAllTasks();
                res.status(200).json(data);
            } catch (error) {
                console.log('There was an error (controller):', error);
                response.status(500).json({ error: 'Error getting Tasks from DB' });
            }finally{
                console.log('getTask finalized (controller)')
            }
        }
    ]
    /*,
    
    next services
    */ 
}


module.exports = taskController;