import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

import { JWT_SECRET } from '../config/env.js'

const authorize = async (req, res, next) => {
    try {
        let token

        // validar que en los encabezados de la solicitud se incluya el token de autorizacion
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer ')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            })
        }

        // se decodifica el token recibido utilizando el secret configurado en el archivo .env
        const decoded = jwt.verify(token, JWT_SECRET)

        // se consulta el usuario en base de datos con el valor del id, el cual se utilizo para crear el token de autenticacion
        const user = await User.findById(decoded.userid)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            })
        }

        // se agrega el usuario a la request
        req.user = user

        next() // se pasa al siguiente middleware si todo se ejecuta correctamente
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
        })
    }
}

export default authorize
