const express = require('express');
const router = express.Router();
//importar controladores
const taskController = require('../controller/tasksController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', taskController.getTasks);

router.put('/:id', verifyToken, taskController.addTask);

router.put('/delete/:id', verifyToken,taskController.deleteTask);

router.post('/group/', verifyToken, taskController.createGroup);

router.delete('/group/:id',  verifyToken, taskController.deleteGroup);



module.exports = router;