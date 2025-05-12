const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createTaskValidation = [
    body('nameGroup')
        .notEmpty()
        .withMessage('nameGruop no puede estar vacio')
        .isString()
        .withMessage('nameGruop debe ser String'),

    body('taskGroup')
        .optional()
        .isArray()
        .withMessage('taskGroup debe ser array'),

];

module.exports = {createTaskValidation};