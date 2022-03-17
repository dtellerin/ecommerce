import {contenidoChat, optionsMongDB} from '../../../config/cfgMongoDB.js'  //archivo de configuracion
import mongoose from 'mongoose'

const ChatDAO = mongoose.model('chat', contenidoChat)
//const productosDAO = mongoose.model('productos', contenidoProductos)

class ContenedorCarrito {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
        //console.log('Base de datos conectada')
    }

    async disconnectDB() {
        await mongoose.disconnect()
        //console.log('Base de datos desconectada')    
    }

    //Agrega un nuevo chat
    async saveChat(mensaje) {
        const ts = Math.floor(Date.now()/1000)
        try {
            await this.connectDB()
            await ChatDAO.insertMany(mensaje)
            await this.disconnectDB()
            const mensajesChat = await this.getAll()
            return (mensajesChat)
        } catch (error) {
            return {error: `No se pudo agregar el chat, error: ${error}`}
        }
    }

    //Obtiene todos los chats
    async getAll() {
        
        try {
            await this.connectDB()
            const mensajes = await ChatDAO.find({}, {"_id": 0})
            await this.disconnectDB()
            return mensajes
        } catch (error) {
            return {error: `Error al buscar chats ${error}`} 
        }

    }
       
}
export default {ContenedorCarrito}