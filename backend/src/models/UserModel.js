const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        default: 'usuario'
    },
    password:{
        type: String,
        required: true
    }

})


//middleware para comparar contraseñas

userSchema.methods.comparePasswords = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}


//middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next()
    } catch (error) {
        console.log('error hasheando');
        next(error);
    }
} )



const User = mongoose.model('User', userSchema);

module.exports = /*{User,*/ userSchema/*}*/;