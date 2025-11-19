import { Router } from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const userRouter = Router()

// path /api/v1/users
userRouter.get('/', authorize, getUsers) // se utiliza el middleware `authorize` para autorizar la consulta de los usuarios
userRouter.get('/:id', authorize, getUser)

userRouter.post('/', (req, res) => {
    res.send({ title: 'CREATE NEW USER' })
})

userRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE USER' })
})

userRouter.delete('/:id', (req, res) => {
    res.send({ title: 'DELETE USER' })
})

export default userRouter
