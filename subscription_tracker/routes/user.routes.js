import { Router } from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()

// /api/v1/users
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)

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
