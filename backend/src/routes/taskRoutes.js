const express = require('express');
const router = express.Router();
//importar controladores
const taskController = require('../controller/tasksController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', taskController.getTasks);

router.put('/:id', taskController.addTask);

router.put('/delete/:id',taskController.deleteTask);

router.post('/group/:token', taskController.createGroup);

router.delete('/group/:id', taskController.deleteGroup);



module.exports = router;