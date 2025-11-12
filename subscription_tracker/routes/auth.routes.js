import { Router } from 'express'
import { signIn, signOut, signUp } from '../controllers/auth.controller.js'

const authRouter = Router()

// path /api/v1/auth
authRouter.post('/sign-up', signUp) // registro
authRouter.post('/sign-in', signIn) // inicio de sesion
authRouter.post('/sign-out', signOut) // finalizacion de la sesion

export default authRouter
