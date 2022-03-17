//const persistencia = 'Archivos' //variable de inicio que indica el metodo de persistencia. Las opciones son "Memoria", "Archivos", "MongoDB" o "FireBase". El default es Memoria.
import {PersistenciaChat} from '../../models/daos/index.js'

const productos = await PersistenciaChat()

import { Router } from 'express'
const routerChat = Router()

routerChat.get('/', async (req, res) => {
    res.send(await productos.getAll())
})

routerChat.get('/:id', async (req, res) => {
    res.json(await productos.getByID(req.params.id))
})

routerChat.post('/', async (req, res) => {
    res.send(await productos.save(req.body));
})

routerChat.delete('/:id', async (req, res) => {
    res.send(await productos.deleteByID(req.params.id))
})

routerChat.put('/:id', async (req, res) => {
    res.send(await productos.updateByID(req.body, req.params.id))
})

export default routerProductos