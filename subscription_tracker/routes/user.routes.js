import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send({ title: 'GET ALL USERS' })
})

userRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET USER DETAILS' })
})

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
