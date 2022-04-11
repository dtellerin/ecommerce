import mongoose from 'mongoose'

export let contenidoCarrito = new mongoose.Schema({
    id: { type: Number, required: true },
    date: { type: String, required: true },
    items: [{
                _id: false,
                productId: { type: Number, required: true },
                title: { type: String, required: true },
                description: {type: String, required: false},
                quantity: {type: Number, required: true},
                subAmount: {type: Number, required: true} 
            }],
    address: {type: String, required: true},
    email: {type: String, required: true}
    })