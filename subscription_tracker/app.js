import express from 'express'
import { PORT } from './config/env.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API!')
})

app.listen(PORT, () => {
    console.log(`Subscription tracker running on port ${PORT}`)
})
