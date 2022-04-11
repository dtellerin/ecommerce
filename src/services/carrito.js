import { PersistenciaCarritos} from '../dao/index.js'

const carrito = await PersistenciaCarritos()

export default {

  getAll: async () => {
    return await carrito.getAll()
  },

 getByEmail: async (email) => {
    return await carrito.getByEmail(email)
  },

  addNewCarrito: async (user) => {
    return await carrito.newCarrito(user)
  }, 
  
  getProductsByIdCarrito: async (id) =>{
    return await carrito.getProductsByCarritoId(id)
  },

  addProductByIdCarrito: async (producto) => {
    return await carrito.addProductByIdCarrito(producto)
  },

  deleteCarritoById: async (carritoId) => {
    return await  carrito.deleteCarritoById(carritoId)
  },

  deleteProductByCarritoId:  async (carritoId) => {
    return await  carrito.deleteProductByCarritoId(carritoId)
  },
  processingOrderByCarritosId: async (carritoId) => {
    return await  carrito.processingOrderByCarritosId(carritoId)
  }
 
}



  