import { Router } from 'express'
import faker from 'faker'
import express from 'express'

faker.locale = 'es'
const app = express()
const routerProductosTest = Router()
let id = 1
let productos = []

function getNextId() {
    return id++
}

function CombinacionAlAzar(id) {
    return {
        id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(1, 10000, 2, '$'),
        thumbnail: faker.image.business(32, 32, true)
        }
}

function generarProductos(cant) {
    productos = []
    for (let i = 0; i < cant; i++) {
        productos.push(CombinacionAlAzar(getNextId()))
    }
    return productos
}

const CANT_PROD = 5
routerProductosTest.get('/', (req, res) => {
    generarProductos(CANT_PROD)
    res.render('templateHistorial', {productos})
})

export default routerProductosTest