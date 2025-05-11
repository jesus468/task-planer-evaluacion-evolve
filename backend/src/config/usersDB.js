const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require('../models/UserModel')

userSchema.methods.comparePasswords = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

userSchema.pre('save', async function(next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next()
    } catch (error) {
        console.log('error hasheando');
        next(error);
    }
} )

const conn = mongoose.createConnection(`mongodb+srv://enmanueljesusjv:nhAbZk2ppNfjL7bR@cluster0.ytimgra.mongodb.net/usersDB?retryWrites=true&w=majority&appName=Cluster0`);
const User = conn.model('User', userSchema);

conn.on('connected', ()=> {
    console.log('conectado correctamente');
})





module.exports = User;