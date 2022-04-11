import mongoose from 'mongoose'

export let usuarios = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false }
})

export let sesionesCliente = new mongoose.Schema({
    _id: { type: String, required: true },
    expires: { type: Date, required: true },
    session: { type: String, required: true }
})
