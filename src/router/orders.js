import controllerOrders from '../controllers/orders.js'
import {auth} from '../utils/jwt.js'
/*-----------------------------------------------------------*/
import express from 'express'
import logger from '../utils/logger.js'

const { Router } = express
const routerOrders = new Router()

//-------------- Ruotes -------------------//

routerOrders.get('/', controllerOrders.getOrders) //-> Pagina de inicio de ordenes
routerOrders.get('/all', controllerOrders.getAllOrders) //-> devuelve todos las ordenes
routerOrders.get('/:email/usuario', controllerOrders.getOrdersByEmail)// -> /:email/usuario devuelve las ordenes según su email
routerOrders.get('/:id', controllerOrders.getOrderById)// -> -> devuelve una orden según su id.
routerOrders.post('/:email/usuario/:id', controllerOrders.processOrder)// -> -> devuelve una orden según su id.

//-----------------------------------------------------------//

//--------------------Route errors------------------------/
routerOrders.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Something is wrong' })
})
//-----------------------------------------------------------//


export default routerOrders