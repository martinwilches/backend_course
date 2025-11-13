import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

import User from '../models/user.model.js'

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession() // iniciar una session de MongoDB
    session.startTransaction() // iniciar una nueva transaccion

    try {
        const { name, email, password } = req.body

        // verificar si el usuario ya existe
        const existUser = await User.findOne({ email })

        if (existUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        // encriptar contraseña
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        // crear usuario
        const newUser = await User.create(
            [{ name, email, password: hashPassword }],
            {
                session, // se creara el usuario solo si se confirma la transaccion
            }
        )

        // generar token
        const token = jwt.sign({ userid: newUser[0]._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })

        await session.commitTransaction() // confirmar la transaccion

        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0],
            },
        })
    } catch (error) {
        await session.abortTransaction() // abortar la transaccion
        next(error)
    } finally {
        session.endSession() // finalizar la session de MongoDB
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // buscar el usuario en la base de datos por su email
        const user = await User.findOne({ email })

        if (!user) {
            const error = new Error('User does not exist')
            error.statusCode = 400
            throw error
        }

        // comparar que la contraseña almacenada en la base de datos sea igual a la enviada por el usuario
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            const error = new Error('The credentials are wrong')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ userid: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        })

        return res.json({
            success: true,
            message: 'User sign in successfully',
            date: {
                user,
                token,
            },
        })
    } catch (error) {
        next(error)
    }
}

export const signOut = (req, res, next) => {}
