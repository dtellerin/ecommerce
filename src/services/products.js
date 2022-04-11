import { PersistenciaProductos} from '../dao/index.js'

const productos = await PersistenciaProductos()

export default {

 getAllProducts: async () => {
    return await productos.getAll()
  },
  
  getOneProduct: async (productId) => {
    return await  productos.getByID(productId)
  },
  
  saveProduct: async (product) => {
    return await productos.save(product)
  },
  
  deleteOneProduct: async (productId) => {
    return await productos.deleteByID(productId)
  },
  
  updateOneProduct: async (product, productId) => {
    return await productos.updateByID(product, productId)
  }
  
}



  