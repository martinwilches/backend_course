import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Subscription name is required'],
            trim: true,
            minLength: 2,
            maxLength: 100,
        },
        price: {
            type: Number,
            required: [true, 'Subscription prices is required'],
            min: [0, 'Price must be greater than 0'],
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP'],
            default: 'USD',
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
        },
        category: {
            type: String,
            enum: [
                'sports',
                'news',
                'enterteinment',
                'lifestlye',
                'technology',
                'finance',
                'politics',
                'other',
            ],
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'cancelled', 'expired'],
            default: 'active',
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                // validar que la fecha de inicio de la subscripcion no sea una fecha futura
                validator: (value) => value <= new Date(),
                message: 'Start date must be in the past',
            },
        },
        renewalDate: {
            type: Date,
            required: true,
            validate: {
                // validar que la fecha de renovacion de la subscripcion sea mayor a la fecha de inicio de dicha suscripcion
                validator: function () {
                    return value > this.startDate
                },
                message: 'Renewal date must be after the start date',
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // referencia `id` del modelo User
            ref: 'User',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
)

const Subscription = mongoose.model('Subscription', subscriptionSchema)

// autocalcular la fecha de renovacion de la subscripcion // se ejecuta antes de que se cree una nueva subscripcion
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalDate = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date()
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalDate[this.frequency]) // getDate() obtiene el valor del dia
    }

    // si la fecha de renovacion es menor a la fecha actual, se actualiza el estado de la subscripcion como expirada
    if (this.renewalDate < new Date()) {
        this.status = 'expired'
    }

    next()
})

export default Subscription
