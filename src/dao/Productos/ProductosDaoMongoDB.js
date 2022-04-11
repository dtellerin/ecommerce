import {optionsMongDB} from '../../config/cfgMongoDB.js'  //archivo de configuracion
import { contenidoProductos } from '../../models/products.js'
import mongoose from 'mongoose'
import fs from 'fs'

const admin = 'false'
const productosDAO = mongoose.model('productos', contenidoProductos)

class ContenedorProductos {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
    }

    async disconnectDB() {
        await mongoose.disconnect()
    }

    //obtengo todos los productos
    async getAll() {
        await this.connectDB()
        const contenido = await productosDAO.find({}, {_id: 0})
        if (contenido == '') {
            this.disconnectDB()
            return ({"response": "404",
                    "info": 'No hay productos cargados'})
        } else {
            this.disconnectDB()
            return (contenido)
        }
    }

    //Obtiene un producto particular por su id
    async getByID(ids) {
        await this.connectDB()
        const contenido = await productosDAO.find({id: ids}, {_id: 0})
        if (contenido == '') {
            this.disconnectDB()
            return ({ "response": "400",
                    "info" : 'producto no encontrado' })
        } else {
            this.disconnectDB()
            return contenido
        }
    }    
 
    //Guarda un producto nuevo con el ID consecutivo
    async save(obj) {
        await this.connectDB()
        const MaxProductID = await productosDAO.find({}, {_id: 0}).sort({id: -1}).limit(1)
        const ts = Math.floor(Date.now()/1000)
        let newId = 0
            
        if (MaxProductID == '') {
                newId = 1
            } else {
                newId = MaxProductID[0].id + 1
            }
        console.log('producto a agregar: ', obj)
        const newProd = Object.assign({id: newId}, {timestamp: ts}, obj) 
        await productosDAO.insertMany(newProd)
        await this.disconnectDB()
        return {"response": "200",
                "info": `Producto agregado`}
    }
    

    //Borra el producto por su Id
    async deleteByID(ids) {
        await this.connectDB()
        const res = await productosDAO.deleteMany({id: ids}) 
        await this.disconnectDB()
                
        if (res.deletedCount == '0') {
            return {"response": "400",
                    "info": "No se encontró producto"}
        } else {
            return {"response": "200",
                    "info": `Producto con el ${ids} borrado`}
        }
    }
    
    //Actuliza el producto por su ID
    async updateByID(obj, ids) {
        await this.connectDB()
        const contenido = await productosDAO.find({id: ids}, {_id: 0})
        if (contenido == '') {
            await this.disconnectDB()
             return {"response": "400",
                    "info": "El producto no existe"}
        } else {
            await productosDAO.updateMany({id: ids}, 
                {$set: {
                    "category": obj.category,
                    "price": obj.price,
                    "thumbnail": obj.thumbail,
                    "code": obj.code,
                    "description": obj.description,
                    "stock": obj.stock
                } }
            )
                await this.disconnectDB()
                return {"response": "200",
                        "info": `El producto ${ids} fue actualizado`
                        }
            }
        }
    }

export default {ContenedorProductos}