import path from 'path'
const __dirname = path.resolve()

import os from 'os'
import cluster  from 'cluster'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
//import {puerto} from '../../config/EnvironmentArgs.js'
import routerSesiones from '../../utils/Sesiones.js'
import routerSystemInfo from '../../scripts/SystemInfo.js'
import routerCalculoRandom from '../../scripts/calculo.js'
import Socket from '../../utils/socket.js'
import logger from '../../utils/logger.js'

const app = express()
const httpServer = new createServer(app)
const io = new Server(httpServer)
const PORT = '8080'

app.use('/api/sesion', routerSesiones)
app.use('/api/info', routerSystemInfo)
app.use('/api/random', routerCalculoRandom)

app.set('views', __dirname + '/public/views')
app.set('view engine', 'ejs')


function serverCluster(PORT) {
    
    const numCPUs = os.cpus().length
   
    if (cluster.isPrimary) {
        
    logger.info(`PID MASTER ${process.pid}`)
      
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
        logger.info('creando una instancia nueva...')
        }
      
        cluster.on('exit', worker => {
        logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
    } else {
    /* --------------------------------------------------------------------------- */
    logger.info('WORKERS')
        
        app.get('/', async (req, res) => {
            await res.redirect('/api/sesion')
        })
              
        app.get('/info', async (req, res) => {
            await res.redirect('/api/info')
        })
        
        app.get('/random', async (req, res) => {
            await res.redirect('/api/random?cant=' + req.query.cant)
        })

        app.get('*', (req, res) => {
            res.sendFile(__dirname + '/public/views/error.html')
        })

        Socket(httpServer)
        const connectedServer = httpServer.listen(PORT, function () {
          clogger.info(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
      })
      connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))
      
     }
}   

      
export default serverCluster