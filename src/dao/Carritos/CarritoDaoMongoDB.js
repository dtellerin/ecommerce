import { optionsMongDB } from '../../config/cfgMongoDB.js'  
import { contenidoProductos } from '../../models/products.js'
import { contenidoCarrito } from '../../models/carrito.js'
import { contenidoOrders } from '../../models/orders.js'
import mongoose from 'mongoose'

const carritosDAO = mongoose.model('carritos', contenidoCarrito)
const productosDAO = mongoose.model('productos', contenidoProductos)
const ordersDAO = mongoose.model('ordenes', contenidoOrders)

class ContenedorCarrito {

    async connectDB() {
        await mongoose.connect(optionsMongDB.uri, {
            serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
    }

    async disconnectDB() {
        await mongoose.disconnect()
    }

    //Agrega un nuevo carrito
    async newCarrito(userCarrito) {
        const fyh = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        await this.connectDB()
        const arrayCarritos = await carritosDAO.find({}, {_id: 0}).sort({id: -1}).limit(1)
        let lastId = 0

            if (arrayCarritos == '') {
                lastId = 1
            } else {
                lastId =  arrayCarritos[0].id + 1
            }
        
        const newCarrito = Object.assign({id: lastId}, {date: fyh}, {address: userCarrito.direccion}, {email: userCarrito.email})
        const res = await carritosDAO.insertMany(newCarrito)
        await this.disconnectDB()
        if (res.nInserted == 0) {
            return {msg: 'error', info: `No se puedo agregar el carrito `}
        } else {
            return ({msg: 'Ok', info: lastId})
        }
    }

    //Borra el carrito de acuerdo al id
    async deleteCarritoById(ids) {
        await this.connectDB()
        const res = await carritosDAO.deleteOne({id: ids}) 
        await this.disconnectDB()
            
        if (res.deletedCount == '0') {
            return {msg: 'error', info: "No se encontró el carrito"}
        } else {
            return {msg: 'Ok', info: `El carrito con el ${ids} borrado`}
        }
    }

    ///Agrega productos al carrito
    async saveByID(productoID) {
        let ProdById = await this.getProdByID(productoID.id_prod) 
        const idCarrito = productoID.id
        
        if (ProdById.error == 'producto no encontrado'){
            return {msg: 'error', info: ProdById}
        } else {
             await this.connectDB()
            const res = await carritosDAO.updateOne({id: idCarrito}, {$push: {producto: ProdById[0]}})
            await this.disconnectDB()
            if (res.modifiedCount == 0) {
                return {msg: 'error', info: `No se puedo agregar el producto al carrito `}
            } else {
                return {msg: 'Ok', info: `Producto con id: ${productoID.id_prod} agregado al carrito ${idCarrito}`}
            }
        }
    }

    //Obtiene el producto de acuerdo a su id
    async getProdByID(ids) {
        await this.connectDB()
        const Producto =  await productosDAO.find({id: ids}, {_id: 0, timestamp: 0})
        await this.disconnectDB()
            if (Producto == '') {
                return ({ msg: 'error', info: 'producto no encontrado' })
            } else {
                return {msg: 'Ok', info: Producto}
            }
    }

    //Obtiene los productos del carrito por su id
    async getProductsByCarritoId(ids) {
        await this.connectDB()
        const Productos =  await carritosDAO.find({id: ids}, {items: 1, "_id": 0})
        await this.disconnectDB()
           if (Productos == '') {
            return ({ msg: 'error', info: 'producto no encontrado' })
        } else {
            return {msg: 'Ok', info: Productos}
        }
    }

    //Elimina el producto elegido dentro del carrito y devuelve al stock las unidades
    async deleteProductByCarritoId(carritoID) {

        const idProd = carritoID.idProd
        const idCarrito = carritoID.idCarrito
        const result = await this.getProdByID(idProd) 
        const ProdById = result.info[0]
        // Obtiene la cantidad de unidades que tiene el carrito para el producto a eliminar y lo suma al stock.
        await this.connectDB()
        const itemsQty = await carritosDAO.findOne({id: idCarrito}, {"_id":0, items: 1}) 
        const prodQty = itemsQty.items.find(element => element.productId == idProd)
        if (prodQty) {
            const idProdQty = Number(prodQty.quantity)
            const remainStock = ProdById.stock + idProdQty
            const resStock = await productosDAO.updateOne({id: ProdById.id }, {stock: remainStock})// -> Agrego las unidades al stock del producto que se elimina
            if (resStock.modifiedCount == 0) {
                await this.disconnectDB()
                return {msg: 'error', info: `No se pudo actualizar el stock`}
            } else {
                 const resDel = await carritosDAO.updateOne({id: idCarrito}, {$pull: {items: {productId: Number(idProd)}}}) // -> Se elimina el objeto del producto del carrito.
                if (resDel.modifiedCount == 0) {
                    await this.disconnectDB()
                    return {msg: 'error', info: `No se encontro el producto al carrito `}
                } else {
                    await this.disconnectDB()
                    return {msg: 'Ok', info: `Producto con id: ${idProd} borrado del carrito ${idCarrito}`}
                }
            }
        }else {
            await this.disconnectDB()
            return {msg: 'error', info: `No se pudo actualizar el stock`}
        }
    }

    //Obtiene todos los carritos
    async getAll() {
        await this.connectDB()
        const res = await carritosDAO.find({}, {"_id": 0, "__v":0})
        await this.disconnectDB()
        if (res == '') {
            return {msg: 'error', info: `No se encontraron carritos`}
        } else {
            return {msg: 'Ok', info: res}
        }
    }

    //Obtiene los carritos del usuario por su email
    async getByEmail(email) {
        await this.connectDB()
        const res = await carritosDAO.find({email: email}, {"_id": 0})
        await this.disconnectDB()
        if (res == '') {
            return {msg: 'error', info: `No se encontro el carrito `}
        } else {
            return {msg: 'Ok', info: res} 
        }
    }
       
    //Agrega productos al carrito y el subtotal por producto.
    async addProductByIdCarrito(producto) {
        let result = await this.getProdByID(producto.idProd) 
        const ProdById = result.info[0]
        
        if (ProdById.error == 'producto no encontrado'){
             return {msg: 'error', info: ProdById}
        } else {
            const prodQty = Number(producto.idProdQuantity)
            const prodPrice = Number(ProdById.price)
            const subAmount = eval(prodPrice * prodQty )

            const obj = Object.assign({productId: producto.idProd, 
                title: ProdById.title,
                description: ProdById.description,
                quantity: producto.idProdQuantity,
                subAmount: subAmount})
             
            await this.connectDB()
            const res = await carritosDAO.updateOne({id: producto.idCarrito}, {$push: {items: obj} })

            if (res.modifiedCount == 0) {
                await this.disconnectDB()
                return {msg: 'error', info: `No se puedo agregar el producto al carrito `}
            } else {
                const idProdQty = Number(producto.idProdQuantity)
                const remainStock = ProdById.stock- idProdQty
                const resStock = await productosDAO.updateOne({id: ProdById.id }, {stock: remainStock})
                await this.disconnectDB()
                
                if (resStock.modifiedCount == 0) {
                    return {msg: 'error', info: `No se puedo agregar el producto al carrito `}
                } else {
                    return {msg: 'Ok', info: `Producto con id: ${producto.idProd} agregado al carrito ${producto.idCarrito}`}
                }
             }
        }
    }

    // Procesa la orden de compra
    async processingOrderByCarritosId(carritoID) {
        const fyh = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        await this.connectDB()
        const arrayOrders = await ordersDAO.find({}, {_id: 0}).sort({id: -1}).limit(1)
        let lastId = 0
        
        if (arrayOrders == '') {
                lastId = 1
            } else {
                lastId = Number(arrayOrders[0].id) + 1
            }
        const carrito = await carritosDAO.find({id: carritoID}, {"_id": 0})
       
        let TotalPrice = 0
            carrito[0].items.forEach(item => {
                TotalPrice += item.subAmount
            })

        const newOrders = Object.assign({id: lastId}, 
                                        {date: fyh},    
                                        {address: carrito[0].address}, 
                                        {email: carrito[0].email},
                                        {state: 'abierta'},
                                        {items: carrito[0].items},
                                        {totalAmount: TotalPrice}
                                        )

        const res = await ordersDAO.insertMany(newOrders)
        await this.disconnectDB()
        if (res.nInserted == 0) {
            return {msg: 'error', info: `No se puedo agregar el carrito `}
        } else {
            return ({msg: 'Ok', info: lastId})
        }
    }
    
}
export default {ContenedorCarrito}