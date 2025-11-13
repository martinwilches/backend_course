import User from '../models/user.model.js'

export const getUsers = async (req, res, next) => {
    try {
        // obtener todos los usuarios
        const users = await User.find()

        res.json({
            success: true,
            data: users,
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        // obtener la informacion de un usuario especifico a excepcion del campo password
        const user = await User.findById(req.params.id).select('-password')

        if (!user) {
            const error = new Error('User does not exist')
            error.statusCode = 404
            throw error
        }

        res.json({
            success: true,
            data: user,
        })
    } catch (error) {
        next(error)
    }
}
