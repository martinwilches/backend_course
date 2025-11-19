import Subscription from '../models/subscription.model.js'

// crear una nueva subscripcion
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // se obtiene el id del usuario autenticado y se asocia con la subscripcion creada
        })

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        })
    } catch (error) {
        next(error)
    }
}
