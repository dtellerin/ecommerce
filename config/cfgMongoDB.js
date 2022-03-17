import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: `./config/config.env` })

export const optionsMongDB = { 
    uri: "mongodb+srv://" + process.env.USER_MONGODB + ":"  + process.env.PASS_MONGODB + "@cluster0.1t3wi.mongodb.net/ecommerce?retryWrites=true&w=majority",
    timeoutConnect: '5000'
    }

export let contenidoCarrito = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    producto: { type: Object, required: false }
    })

export let contenidoProductos = new mongoose.Schema({
    title: { type: String, required: true },
    descripcion: { type: String, required: true },
    code: { type: String, required: true },
    thumbail:  { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    id: { type: Number, required: true },
    timestamp: {type: Number, required: true}
})

export let contenidoChat = new mongoose.Schema({
    author: { 
        id: {type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad:  { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true },
    ts: {type: Number, required: true}
})

export let sesionesCliente = new mongoose.Schema({
    _id: { type: String, required: true },
    expires: { type: Date, required: true },
    session: { type: String, required: true }
})

export let usuarios = new mongoose.Schema({
    usuario: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false }
})

