import express from 'express'
import { PORT } from './config/env.js'

import cookieParser from 'cookie-parser'

import connectToDatabase from './database/mongodb.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import workflowRouter from './routes/workflow.routes.js'

import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'

const app = express() // aplicacion de express

/* middlewares */
app.use(express.json()) // leer datos JSON enviados por el cliente
app.use(cookieParser()) // acceder a la informacion de las cookies
app.use(express.urlencoded({ extended: false })) // analizar datos de formularios codificados, haciendolos accesibles a traves de req.body
app.use(arcjetMiddleware) // controlar las peticiones que recibe la aplicacion

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.get('/', async (req, res, next) => {
    res.send('Welcome to the subscription tracker API!')
})

// el middleware que se encarga de manejar los errores debe ser llamado posterior a todas las demas rutas
app.use(errorMiddleware)

app.listen(PORT, async () => {
    console.log(`Subscription tracker running on port ${PORT}`)

    // conexion a la base de datos de mongodb
    await connectToDatabase()
})
