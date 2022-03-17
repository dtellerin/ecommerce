import {contenidoProductos, optionsMongDB, contenidoCarrito} from '../../../config/cfgMongoDB.js'  //archivo de configuracion
import mongoose from 'mongoose'

const carritosDAO = mongoose.model('carritos', contenidoCarrito)
const productosDAO = mongoose.model('productos', contenidoProductos)

class ContenedorCarrito {

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

    //Agrega un nuevo carrito
    async newCarrito() {
        const ts = Math.floor(Date.now()/1000)
        await this.connectDB()
        const arrayCarritos = await carritosDAO.find({}, {_id: 0}).sort({id: -1}).limit(1)
        const lastId = 0

            if (arrayCarritos == '') {
                lastId = 1
            } else{
                lastId =  arrayCarritos[0].id + 1
            }

        const newCarrito = Object.assign({id: lastId}, {timestamp: ts}, {producto: {}})
        await carritosDAO.insertMany(newCarrito)
        await this.disconnectDB()
       return ({id: lastId})
    }

    //Borra el carrito de acuerdo al id
    async deleteByID(ids) {
        await this.connectDB()
        const res = await carritosDAO.deleteOne({id: ids}) 
        await this.disconnectDB()
            
        if (res.deletedCount == '0') {
            return {info: "No se encontró producto"}
        } else {
            return {info: `El carrito con el ${ids} borrado`}
        }
    }

    ///Agrega prodcutos al carrito
    async saveByID(productoID) {
        let ProdById = await this.getProdByID(productoID.id_prod) 
        const idCarrito = productoID.id
        
        if (ProdById.error == 'producto no encontrado'){
            return ProdById
        } else {
             await this.connectDB()
            const res = await carritosDAO.updateOne({id: idCarrito}, {$push: {producto: ProdById[0]}})
            await this.disconnectDB()
            if (res.modifiedCount == 0) {
                return {error: `No se puedo agregar el producto al carrito `}
            } else {
                return {info: `Producto con id: ${productoID.id_prod} agregado al carrito ${idCarrito}`}
            }
        }
    }

    //Obtiene el producto de acuerdo a su id
    async getProdByID(ids) {
        await this.connectDB()
        const Producto =  await productosDAO.find({id: ids}, {_id: 0, timestamp: 0})
        await this.disconnectDB()

            if (Producto == '') {
                return ({ error : 'producto no encontrado' })
            } else {
                return Producto
            }
    }

    //Elimina el producto elegido dentro del carrito
    async deleteByProdID(productoID) {
        const idProd = productoID.id_prod
        const idCarrito = productoID.id
        await this.connectDB()
        const res = await carritosDAO.updateOne({id: idCarrito}, {$pull: {producto: {id: Number(idProd)}}})
        await this.disconnectDB()
        if (res.modifiedCount == 0) {
            return {error: `No se encontro el producto al carrito `}
        } else {
            return {info: `Producto con id: ${productoID.id_prod} borrado del  carrito ${idCarrito}`}
        }
    }


    //Obtiene todos los productos del carrito
    async getAll(idCarrito) {
        await this.connectDB()
        const res = await carritosDAO.find({id: idCarrito}, {"_id": 0})
        if (res == '') {
            return {error: `No se encontro el carrito `}
        } else {
            return res
        }
    }
       
}
export default {ContenedorCarrito}