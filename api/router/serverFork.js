import path from 'path'
const __dirname = path.resolve()

import routerSesiones from '../../utils/Sesiones.js'
import routerSystemInfo from '../../scripts/SystemInfo.js'
import routerCalculoRandom from '../../scripts/calculo.js'
import routerProductos from './Productos.js'
import Socket from '../../utils/socket.js'
import express from 'express'
import { createServer } from 'http'
import logger from '../../utils/logger.js'
import {v1 as uuidv1} from 'uuid'

const app = express()
const httpServer = new createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use('/api/sesion', routerSesiones)
app.use('/api/info', routerSystemInfo)
app.use('/api/random', routerCalculoRandom)
app.use('/api/productos', routerProductos)
app.use(express.static('public'))

app.set('views', __dirname + '/public/views')
app.set('view engine', 'ejs')

function serverFork(PORT) {

// app.get('/', async (req, res) => {
//     await res.redirect('/api/sesion')
// })
      
app.get('/info', (req, res) => {
    res.redirect('/api/info?uuidv1=' + uuidv1())
})

app.get('/random', (req, res) => {
    res.redirect('/api/random?cant=' + req.query.cant + '&uuidv1=' + uuidv1())
})

app.get('/productos', (req, res) => {
    res.redirect('/api/productos')
})

app.get('/productos/:id', (req, res) => {
    res.redirect('/api/productos/:id')
})


app.get('*', (req, res) => {
    logger.error(`[ ${uuidv1()} ]: Ruta no encontrada`),
    res.status(404).sendFile(__dirname + '/public/error.html')
})

Socket(httpServer, uuidv1())

const connectedServer = httpServer.listen(PORT, function () {
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
    })
connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))
}

export default serverFork

