const User = require('../config/usersDB')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'susuper7secreto'

const authControler = {
    login: async (req , res ) => {

        console.log(req.body, 'body')

        try {
            const {email , password} = req.body;
            const user = await User.findOne({email});

            if(!user){
                return res.status(401).json({
                    succes: 'NOK',
                    code: res.statusCode,
                    message: 'Datos invalidos'
                });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                return res.status(401).json({
                    succes: 'NOK',
                    code: res.statusCode,
                    message: 'contraseña invalidas'
                });
            }

            let token = 0;

            if(user.rol==='admin'){
                console.log('admin');
                token = jwt.sign(
                    {
                        userId: user._id,
                        email: user.email,
                        nombre: user.name
                    },JWT_SECRET, {expiresIn: '10s'}
                )
            }

            res.json({
                success: 'ok',
                message: 'login exitoso',
                token: token,
                user: {user: user.name, user: user.email }
            })
        } catch (error) {
            console.log('autenticacion error', error);
        }finally{
            console.log('autenticacion terminada');
        }
    },

    logout: async (req, res) => {

    }
}

module.exports = authControler;