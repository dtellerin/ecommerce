import {optionsMongDB, contenidoProductos} from '../../../config/cfgMongoDB.js'  //archivo de configuracion
import mongoose from 'mongoose'
import fs from 'fs'

const admin = 'false'
const productosDAO = mongoose.model('productos', contenidoProductos)

class ContenedorProductos {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
        //console.log('Base de datos conectada')
    }

    async disconnectDB() {
        await mongoose.disconnect()
        //console.log('Base de datos desconectada')    
    }

    //obtengo todos los productos en el archivo
    async getAll() {
        await this.connectDB()
        const contenido = await productosDAO.find({}, {_id: 0})
        if (contenido == '') {
            this.disconnectDB()
            return ({error: 'No hay productos cargados'})
        } else {
            this.disconnectDB()
            return (contenido)
        }
    }

    //Obtiene un producto partuclar por su id del archivo
    async getByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            await this.connectDB()
            const contenido = await productosDAO.find({id: ids}, {_id: 0}, )
           if (contenido == '') {
                this.disconnectDB()
                return ({ error : 'producto no encontrado' })
            } else {
                this.disconnectDB()
                return contenido
            }
            
        }
    }
 
    //Guarda el id del nuevo producto y lo persiste en archivo
    async save(obj) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo POST no autorizada'}
        } else {
            await this.connectDB()
            const MaxProductID = await productosDAO.find({}, {_id: 0}).sort({id: -1}).limit(1)
            const ts = Math.floor(Date.now()/1000)
            let newId = 0
            
            if (MaxProductID == '') {
                    newId = 1
                } else {
                    newId = MaxProductID[0].id + 1
                }

            const newProd = Object.assign({id: newId}, {timestamp: ts}, obj) // inserta el siguiente prodcuto incrementadno el id
            await productosDAO.insertMany(newProd)
            await this.disconnectDB()
            return newProd
        }
    }

    //Borra el prodcuto por su Id y lo persiste en archivo
    async deleteByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo DEL no autorizada'}
        } else {
            await this.connectDB()
            const res = await productosDAO.deleteMany({id: ids}) 
            await this.disconnectDB()
                
            if (res.deletedCount == '0') {
                return {info: "No se encontró producto"}
            } else {
                return {info: `Producto con ${ids} borrado`}
            }
        }
    }

    //Actualiza el producto por su id y lo persiste en archivo
    async updateByID(obj, ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            await this.connectDB()
            const contenido = await productosDAO.find({id: ids}, {_id: 0})
            
            if (contenido == '') {
                await this.disconnectDB()
                return {error: "El producto no existe"}
            } else {
                await productosDAO.updateMany({id: ids}, 
                    {$set: {
                        "title": obj.title,
                        "price": obj.price,
                        "thumbnail": obj.thumbail,
                        "code": obj.code,
                        "descripcion": obj.descripcion,
                        "stock": obj.stock
                    } }
                )
                await this.disconnectDB()
                return {info: `El producto ${ids} fue actualizado`}
            }
        }
        
    }

}

export default {ContenedorProductos}