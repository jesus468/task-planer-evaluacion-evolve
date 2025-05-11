//importar servicios
const { response } = require('express');
const {getAllTasks , addTasks, deleteTask, deleteGroup, createGroup} = require('../services/taskServices');
//importar validaciones
const {createTaskValidation} = require('../validations/taskValidations')

const taskController ={
    getTasks: [
        async (req, res) =>{
            console.log('get task');
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
    ],

    addTask: [
        ...createTaskValidation,
        async (req, res) => {
            
            const { id } = req.params;
            console.log('viendo los datos en el controlador' , req.body)
                
            try {
                const data = await addTasks(id, req.body);
                console.log(data);
                res.status(200).json(data);
            } catch (error) {
                console.log('ERROR adding task', error);
                response.status(500).json({ error: 'Error adding Tasks to DB' });
            }finally{
                console.log('add task finalized');
            }
        }
    ],
    deleteTask: [
        ...createTaskValidation,
        async (req, res) => {
            const { id } = req.params;
            const taskData = req.body;
            console.log(id);

            try {
                const data = await deleteTask(id, taskData);
                console.log(data);
                res.status(200).json(data);
            } catch (error) {
                console.log('ERROR deleting task', error);
                response.status(500).json({ error: 'Error deleting Tasks to DB' });
                
            }finally{
                console.log('delete task finalized');
            }
        }
    ],
    deleteGroup: [
        //...createTaskValidation,
        async (req, res) => {
            const { id } = req.params;
            //const taskData = req.body;
            console.log(id);

            try {
                const data = await deleteGroup(id);
                console.log(data);
                res.status(200).json(data);
            } catch (error) {
                console.log('ERROR deleting group', error);
                response.status(500).json({ error: 'Error deleting group to DB' });
                
            }finally{
                console.log('delete group finalized');
            }
        }
    ],
    createGroup: [
      //...createTaskValidation,
        async (req, res) => {
            const groupData = req.body
            try {
                const data = await createGroup(groupData);
                console.log(data);
                res.status(200).json(data);
            } catch (error) {
                console.log('ERROR creating group', error);
                response.status(500).json({ error: 'Error creating group to DB' });
                
            }finally{
                console.log('creating group finalized');
            }
        }
    ]
}


module.exports = taskController;