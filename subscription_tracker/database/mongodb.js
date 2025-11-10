import mongoose from 'mongoose'
import { DB_URI } from '../config/env.js'

if (!DB_URI) {
    {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.<development/production>.local'
        )
    }
}

// conectar la base de datos de mongodb
const connectToDatabase = async () => {
    try {
        // establecer la conexion a traves de la URI de mongodb
        await mongoose.connect(DB_URI)
    } catch (error) {
        console.error('Error connecting to database: ', error)
        process.exit()
    }
}

export default connectToDatabase
