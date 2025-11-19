import { Router } from 'express'
import { createSubscription } from '../controllers/susbscription.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({ title: 'GET ALL SUBSCRIPTIONS' })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({ title: 'GET SUBSCRIPTION DETAILS' })
})

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ title: 'UPDATE SUBSCRIPTION' })
})

subscriptionRouter.delete('/', (req, res) => {
    res.send({ title: 'DELETE SUBSCRIPTION' })
})

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ title: 'GET ALL SUBSCRIPTIONS USER' })
})

subscriptionRouter.put('/user/:id', (req, res) => {
    res.send({ title: 'CANCEL USER SUBSCRIPTION' })
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ title: 'GET UPCOMING RENEWALS' })
})

export default subscriptionRouter
