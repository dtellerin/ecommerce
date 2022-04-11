import path from 'path'
const __dirname = path.resolve()

import { createServer } from 'http'
import express from 'express'

import routerSession from '../router/session.js'
import routerChat from '../router/chat.js'
import routerProducts from '../router/productos.js'
import routerCarrito from '../router/carrito.js'
import routerOrders from '../router/orders.js'
import routerSystemInfo from '../scripts/SystemInfo.js'
import routerCalculoRandom from '../scripts/calculo.js'
import Socket from '../utils/socket.js'
import logger from '../utils/logger.js'

const app = express()
const httpServer = new createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.set('views', __dirname + '/public/views')
app.set('view engine', 'ejs')

app.use('/api/sesion', routerSession)
app.use('/api/productos', routerProducts)
app.use('/api/carrito', routerCarrito)
app.use('/api/chat', routerChat)
app.use('/api/ordenes', routerOrders)
app.use('/api/info', routerSystemInfo)
app.use('/api/random', routerCalculoRandom)

//---------------- Routers information-------------------//
app.get('/info', (req, res) => {
    res.redirect('/api/info')
})

app.get('/random', (req, res) => {
    res.redirect('/api/random?cant=' + req.query.cant)
})

app.get('*', (req, res) => {
    logger.error(`Ruta no encontrada ${req.path}`),
    res.status(404).sendFile(__dirname + '/public/error.html')
})

Socket(httpServer)

export default httpServer

