// importacion de la funcion config // dotenv carga variables de entorno desde un archivo .env al objeto global process.env
import { config } from 'dotenv'

// si NODE_ENV es undefined, por defecto se carga el contenido del archivo .env.development.local
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

// se desestructuran las propiedades del objeto global process.env y se exportan para que sean accesibles desde otros modulos
export const {
    PORT,
    NODE_ENV,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCKET_ENV,
} = process.env
