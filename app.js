import {puerto} from './src/config/EnvironmentArgs.js'
import httpServer  from './src/api/server.js'
import logger from './src/utils/logger.js'

const PORT = process.env.PORT || puerto
logger.info('Inicia Server')

const connectedServer = httpServer.listen(PORT, function () {
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
    })
connectedServer.on('error', error => logger.error(`Error en servidor ${error}`))


