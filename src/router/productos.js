import { Router } from 'express'
import controlProducts from '../controllers/products.js'

const routerProductos = Router()

//---------------Routes ------------------//

routerProductos.get('/', controlProducts.initProducts)// -> Renderiza la pagina principal
routerProductos.get('/productos', controlProducts.getAllProducts)//- > Trae todos los productos de MongoDB
routerProductos.get('/:id', controlProducts.getOneProduct)// -> Obtiene un producto por id
routerProductos.post('/', controlProducts.saveProduct)//-> Agrega un producto nuevo
routerProductos.delete('/:id', controlProducts.deleteOneProduct)//-> Borra un producto por su id
routerProductos.put('/:id', controlProducts.updateOneProduct)//-> Actualiza un producto por su id

/*-----------------------------------------------------------*/
//Route errors
routerProductos.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Something is wrong' })
})
/*-----------------------------------------------------------*/

export default routerProductos