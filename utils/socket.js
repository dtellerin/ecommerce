import { Server } from 'socket.io'
import {PersistenciaProductos, PersistenciaChat} from '../models/daos/index.js'
import express  from 'express'
import logger from './logger.js'

const app = express()
const productos = await PersistenciaProductos()
const chats = await PersistenciaChat()

function Socket(server, sessionID){
    const io = new Server(server)
    io.on('connection', async socket => {
        socket.emit('mensajes', await chats.getAll())
        socket.emit('productos', await productos.getAll())
        
        socket.on('nuevoMensaje', async mensaje => {
            mensajes = await chats.saveChat(mensaje)
            try {
                io.sockets.emit('mensajes', mensajes)
            } catch (error) {
                io.sockets.emit('mensajes', 'error al escribir el chat')
                logger.error('Error al insertar el chat, error: ', error)
            } finally {
                io.sockets.emit('mensajes', 'error')
                logger.error('Error general del chat, error: ', error)
                }
        })
        
        socket.on('update', async producto => {
            try {
                    await productos.save(producto)  
                } catch (error) {
                    io.sockets.emit('producto', 'error al insertar el producto')
                    logger.error('Error al insertar producto, error: ', error)
                } finally {
                    io.sockets.emit('producto', 'error')
                    logger.error('Error generico producto, error: ', error)
                }
        })
    })
}

export default Socket