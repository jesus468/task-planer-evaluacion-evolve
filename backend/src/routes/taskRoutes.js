const express = require('express');
const router = express.Router();
//importar controladores
const taskController = require('../controller/tasksController');

router.get('/', taskController.getTasks);



module.exports = router;