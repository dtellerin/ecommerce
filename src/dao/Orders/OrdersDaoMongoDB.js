import { optionsMongDB } from '../../config/cfgMongoDB.js'  
import { contenidoOrders } from '../../models/orders.js'
import mongoose from 'mongoose'

const ordersDAO = mongoose.model('ordenes', contenidoOrders)

class ContenedorOrders {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
    }

    async disconnectDB() {
        await mongoose.disconnect()
    }

    //Obtiene todas las ordenes
    async getAll() {
        await this.connectDB()
        const res = await ordersDAO.find({}, {"_id": 0, "__v":0})
        await this.disconnectDB()
        if (res == '') {
            return {msg: 'error', info: `No se encontraron ordernes`}
        } else {
            return {msg: 'Ok', info: res}
        }
    }

//Obtiene las ordenes abiertas del usuario por su email
    async getByEmail(email) {
        await this.connectDB()
        const res = await ordersDAO.find({email: email, state: "abierta"}, {"_id": 0})
        await this.disconnectDB()
        if (res == '') {
            return {msg: 'error', info: `No se encontraron ordenes para el usuario ${email} `}
        } else {
            return {msg: 'Ok', info: res}
        }
    }

    //Obtiene lss ordenes por su id
    async getOrderById(id_order) {
        await this.connectDB()
        const res = await ordersDAO.find({id: id_order}, {"_id": 0})
        await this.disconnectDB()
        if (res == '') {
            return {msg: 'error', info: `No se encontraron ordenes con el id: ${id_order} `}
        } else {
            return {msg: 'Ok', info: res}
        }
    }

    //Procesa la orden confirmada
    async processOrderById (producto) {
        const id_order = producto.id_order
        const email = producto.email
        
        await this.connectDB()
        const orderById = await ordersDAO.find({id: id_order}, {"_id": 0})
       
        if (orderById == '') {
            return {msg: 'error', info: `No se pudo procesar la orden  ${id_order}`}
        } else {
            const confirmOrder = await ordersDAO.updateOne({id: id_order, email: email}, {state: 'cerrada'})
            if (confirmOrder.modifiedCount == 0) {
                await this.disconnectDB()
                return {msg: 'error', info: `No se pudo cerrar la orden ${id_order}`}
            } else {
                await this.disconnectDB()
                return { msg: 'Ok', info : `Se proceso la orden ${id_order}`, orderById: orderById}
           }
        }
    }
}

export default {ContenedorOrders}