const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const authControler = require('../controller/authControllert');

router.get('/', userController.getUsers);

router.post('/new', userController.createUserss);

router.post('/log', authControler.login);
module.exports = router;