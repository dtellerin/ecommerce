import { PersistenciaOrders } from '../dao/index.js'
import EnviarMail from '../utils/email.js'
import dotenv from 'dotenv'
dotenv.config({ path: `../config/config.env` })

const orders = await PersistenciaOrders()

export default {
    getAll: async() => { //Devuelve todas las ordenes
        const allOrders = await orders.getAll()
        return allOrders
    },

    getOrderById: async(id) => { //Devuelve orden por id
        const orderById = await orders.getOrderById(id)
        return orderById
    },

    getByEmail: async(email) => { //Devuelve orden por email
        const orderByEmail = await orders.getByEmail(email)
        return orderByEmail
    },

    processOrder: async(confirmOrder) => { //procesa la orden confirmada
        const processOrderById = await orders.processOrderById(confirmOrder)
        
        if(processOrderById.msg == 'Ok') {
            const emailBody = processOrderById.orderById[0]
            EnviarMail( process.env.EMAIL_FOR_NEWORDERS, 
                'Nueva Orden de compra confirmada',   
                `Se registro una nueva orden de compra. <br>
                Usuario: ${emailBody.email} <br>
                Id de la Orden: ${emailBody.id} <br>
                Fecha: ${emailBody.date} <br>
                Monto Total: ${emailBody.totalAmount} <br>
                Items: ${emailBody.items} <br>
                `)
            return processOrderById
        } else{  
            return processOrderById
            }
    }
}
