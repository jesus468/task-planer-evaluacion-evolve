const mongoose = require('mongoose');

const { userSchema } = require('../models/UserModel')

const conn = mongoose.createConnection(`mongodb+srv://enmanueljesusjv:nhAbZk2ppNfjL7bR@cluster0.ytimgra.mongodb.net/usersDB?retryWrites=true&w=majority&appName=Cluster0`);
const User = conn.model('User', userSchema);

conn.on('connected', ()=> {
    console.log('conectado correctamente');
})

module.exports = {User};