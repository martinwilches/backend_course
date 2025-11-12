import mongoose from 'mongoose'

// se definen los campos que tendra el documento y las restricciones que cada una de estos deben cumnplir antes de guardar el registro en la base de datos
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            required: [true, 'User email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            math: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: 6,
        },
    },
    { timestamps: true }
)

// definion del modelo el cual sera utilizado para interactuar con la base de datos
const User = mongoose.model('User', userSchema)

export default User
