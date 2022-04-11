import { Server } from 'socket.io'
import {PersistenciaProductos, PersistenciaChat} from '../dao/index.js'
import express  from 'express'
import logger from './logger.js'

const app = express()
const productos = await PersistenciaProductos()
const chats = await PersistenciaChat()

function Socket(server){
    const io = new Server(server)
    io.on('connection', async socket => {
        const allMsgs = await chats.getAllChats()
        socket.emit('mensajes', allMsgs)
        const allProducts = await productos.getAll()
        socket.emit('productos', allProducts)
        
        socket.on('nuevoMensaje', async mensaje => {
            const mensajes = await chats.saveChat(mensaje)
            try {
                io.sockets.emit('mensajes', mensajes)
            } catch (error) {
                io.sockets.emit('mensajes', 'error al escribir el chat')
               logger.error('Error al insertar el chat, error: ', error)
            }
        })
        
        socket.on('allMessages', async ()=> {
           const mensajes = await chats.getAllChats()
            try {
                io.sockets.emit('mensajes', mensajes)
            } catch (error) {
                io.sockets.emit('mensajes', 'error al obtener los chats')
                logger.error('Error al insertar el chat, error: ', error)
            }
        })
        

        socket.on('chatByUser', async email => {
            const msgsUser = await chats.getUserChats(email)
            try {
                io.sockets.emit('msgsUser', msgsUser)
            } catch (error) {
                io.sockets.emit('msgsUser', 'error al obtener chats')
               logger.error('Error al insertar el chat, error: ', error)
            }
        })
    })
}

export default Socket