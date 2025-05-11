const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'susuper7secreto';

const verifyToken = (req, res, next) => {
    //obtener el token de la cookie firmada

    const token = req.signedCookies.token;

    if(!token){
        console.log('no se encontro token en la cookie firmada');
        return res.status(401).json({
            success: 'NOK',
            message: 'se requiere token de autenticacion'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('token verificado', decoded);
        req.user = decoded ////////////// req.user?
        next();
    } catch (error) {
        console.error('error al verificar token', e);
        res.status(401).json({
            message: 'token invalido'
        })
    }
}

module.exports = verifyToken;