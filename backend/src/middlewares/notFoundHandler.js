const notFoundHandler = (req, res, next) => {
    const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

module.exports = notFoundHandler; 