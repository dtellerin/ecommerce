import mongoose from 'mongoose'

export let contenidoOrders = new mongoose.Schema({
    id: { type: String, required: true },
    email: {type: String, required: true },
    state: {type: String, required: true },
    date: {type: String, required: true },
    items:[{
            _id: false,
            productId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            subAmount: { type: Number, required: true }
        }],
    totalAmount: { type: Number, required: true}
    })
    