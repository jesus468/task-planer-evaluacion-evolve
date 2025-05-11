const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createUserValidation = [
    body('name')
        .notEmpty()
        .withMessage('nameGruop no puede estar vacio')
        .isString()
        .withMessage('name debe ser String'),

    body('secondName')
        .notEmpty()
        .withMessage('nameGruop no puede estar vacio')
        .isArray()
        .withMessage('secondName debe ser array'),
    body('email')
        .notEmpty()
        .withMessage('email no puede estar vacio')
        .isEmail()
        .withMessage('email debe ser de tipo email'),
    body('password')
        .notEmpty()
        .withMessage('password no puede estar vacio')
        .isArray()
        .withMessage('password debe ser array'),
    
];

module.exports = {createUserValidation};