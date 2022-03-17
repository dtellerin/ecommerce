//const persistencia = 'MongoDB' //variable de inicio que indica el metodo de persistencia. Las opciones son "Memoria", "Archivos", "MongoDB" o "FireBase". El default es Memoria.
import {PersistenciaProductos} from '../../models/daos/index.js'

const productos = await PersistenciaProductos()

import { Router } from 'express'
const routerProductos = Router()

routerProductos.get('/', async (req, res) => {
    res.json(await productos.getAll())
})

routerProductos.get('/:id', async (req, res) => {
    res.json(await productos.getByID(req.params.id))
})

routerProductos.post('/', async (req, res) => {
    res.send(await productos.save(req.body));
})

routerProductos.delete('/:id', async (req, res) => {
    res.send(await productos.deleteByID(req.params.id))
})

routerProductos.put('/:id', async (req, res) => {
    res.send(await productos.updateByID(req.body, req.params.id))
})

export default routerProductos