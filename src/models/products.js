import mongoose from 'mongoose'

export let contenidoProductos = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    thumbnail:  { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    id: { type: Number, required: true },
    category: { type: String, required: true },
    timestamp: {type: Number, required: true}
})

