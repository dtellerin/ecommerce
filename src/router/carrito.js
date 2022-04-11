import { Router } from 'express'
import controlCarritos from '../controllers/carrito.js'
import logger from '../utils/logger.js'
const routerCarritos = new Router()

//-----------------Routes ----------------------------//

//-------Carritos Operations --------------//
routerCarritos.get('/', controlCarritos.getInitialCarrito) //-> devuelve todos los carritos
routerCarritos.get('/:email/carrito', controlCarritos.getCarritosByEmail) //-> /:email/usuario -> devuelve los carritos según su email.
routerCarritos.post('/', controlCarritos.postCarritosApi) // -> recibe y agrega un carrito, y lo devuelve con su id asignado.
routerCarritos.delete('/:id', controlCarritos.deleteCarritoById) // -> /:id vacia y elimina un carrito según su id.
routerCarritos.get('/carritos', controlCarritos.getAllCarritos)// -> devuelve todos los carritos

//-------Carritos Products Operations ------------////
routerCarritos.get('/:id/productos', controlCarritos.getProductosByIdCarritosApi) // -> :id/productos -> devuelve los productos de un carrito según su id.
routerCarritos.post('/:id_carrito/productos/:id_prod/quantity/:id_prod_quantity', controlCarritos.addProductByCarritoId) // -> id/productos/cantidad  recibe el producto, cantidad y lo agrega a un carrito según su id.
routerCarritos.delete('/:id_carrito/productos/:id_prod', controlCarritos.deleteProductByCarritoId) // -> /:id/productos/:id_prod elimina un producto del carrito

// ------- Process Order -----------//
routerCarritos.post('/:id/venta', controlCarritos.processingOrder) // -> id/venta recibe el carrito en el body y procede a la venta del mismo (lo procesa).

//--------------------Route errors------------------------/
routerCarritos.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Something is wrong' })
})
//-----------------------------------------------------------//


export default routerCarritos