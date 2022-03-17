import {tipo, puerto} from './config/EnvironmentArgs.js'
import serverCluster  from './api/router/serverCluster.js'
import serverFork  from './api/router/serverFork.js'
import logger from './utils/logger.js'
import enviarMail from './utils/email.js'

const port = process.env.PORT || puerto

if (tipo == 'CLUSTER') {
    
    logger.info('Inicio server en modo CLUSTER')
    serverCluster(port)
   
    } else {
    enviarMail('dtellerin@hotmail.com', 'Prueba1', 'Inicia Server FORK')
    logger.info('Inicio server en modo FORK')
    serverFork(port)

}
