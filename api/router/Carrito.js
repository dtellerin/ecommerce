//const persistencia = 'MongoDB' //variable de inicio que indica el metodo de persistencia. Las opciones son "Memoria", "Archivos", "MongoDB" o "FireBase". El default es Memoria.
import {PersistenciaCarritos} from '../../models/daos/index.js'
 
const carrito = await PersistenciaCarritos()

import { Router } from 'express'
const routerCarrito = Router()


routerCarrito.post('/', async (req, res) => {
    res.send(await carrito.newCarrito())
})

routerCarrito.delete('/:id', async (req, res) => {
    res.send(await carrito.deleteByID(req.params.id))
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
   res.send(await carrito.saveByID(req.params))
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    res.send(await carrito.deleteByProdID(req.params))
})

routerCarrito.get('/:id/productos', async (req, res) => {
    res.send(await carrito.getAll(req.params.id))
})

routerCarrito.get('/:id', async (req, res) => {
    res.json(await carrito.getByID(req.params.id))
})





routerCarrito.put('/:id', async (req, res) => {
    //console.log (req.body)
    res.send(await carrito.updateByID(req.body, req.params.id))
})

//exports.routerCarrito = routerCarrito;
export default routerCarrito