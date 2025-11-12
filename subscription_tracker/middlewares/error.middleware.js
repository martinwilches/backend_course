const errorMiddleware = (err, req, res, next) => {
    try {
        // desestructurar err y asignarlo en un nuevo objeto a la variable error
        let error = { ...err }

        // por defecto asignar el mensaje de error a la propiedad message de la nueva variable error
        error.message = err.message

        // bad object id
        if (err.name === 'CastError') {
            const message = 'Resource not found'
            error = new Error(message)
            error.statusCode = 404
        }

        // duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered'
            error = new Error(message)
            error.statusCode = 400
        }

        // validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((val) => val.message)
            error = new Error(message.join(', '))
            error.statusCode = 400
        }

        res.status(error.statusCode || 500).send({
            success: false,
            message: error.message || 'Server error',
        })
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware
