const User = require('../config/usersDB')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sssupuer7ecret'

const authControler = {
    login: async (req , res ) => {

        console.log(req.body, 'body')

        try {
            const {email , password} = req.body;
            const user = await User.findOne({email});

            if(!user){
                return res.status(401).json({
                    succes: 'NOK',
                    message: 'Datos invalidos'
                });
            }

            console.log(user, '----------- lo que la base de datos encontro');

            const password1 = await bcrypt.hash(password, 10)
            console.log(password1);
            console.log(user.password);

            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log(isValidPassword);
            if(!isValidPassword){
                return res.status(401).json({
                    succes: 'NOK',
                    message: 'contraseña invalidas'
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    nombre: user.name
                },JWT_SECRET, {expiresIn: '6h'}
            )

            console.log(token, '---------------------esto es el token')

            //configurar la cookie con el token
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax', 
                path: '/',
                maxAge: 6 * 60 * 60 * 1000,
                domain: 'localhost',
                signed: true
            })
            
            res.json({
                success: 'ok',
                message: 'login exitoso',
                token: token,
                user: {user: user.name, user: user.email }
            })
            console.log('token generado:', token);
            console.log('cookie configurada:', res.getHeader('set-Cookie'));
        } catch (error) {
            console.log('autenticacion error', error);
        }finally{
            console.log('autenticacion terminada');
        }
    }
}

module.exports = authControler;