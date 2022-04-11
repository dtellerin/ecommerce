import {optionsMongDB} from '../../config/cfgMongoDB.js'  
import {contenidoChat} from '../../models/chat.js'
import mongoose from 'mongoose'

const ChatDAO = mongoose.model('chat', contenidoChat)

class ContenedorCarrito {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
        }

    async disconnectDB() {
        await mongoose.disconnect()
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
    async getAllChats() {
        
        try {
            await this.connectDB()
            const mensajes = await ChatDAO.find({}, {"_id": 0})
            await this.disconnectDB()
            return mensajes
        } catch (error) {
            return {error: `Error al buscar chats ${error}`} 
        }

    }
     
    //Obtiene todos los chats por usuario
    async getUserChats(email) {
        
        try {
            await this.connectDB()
            const mensajes = await ChatDAO.find({"author.id": email}, {"_id": 0})
            await this.disconnectDB()
            return mensajes
        } catch (error) {
            return {error: `Error al buscar chats ${error}`} 
        }

    }
      
}
export default {ContenedorCarrito}