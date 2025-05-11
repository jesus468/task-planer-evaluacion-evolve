const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    secondName: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        custom: { function(v) {
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
        },
        message: '{VALUE} no es un correo electrónico válido.'
        } 
    },
    rol:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }

})

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};