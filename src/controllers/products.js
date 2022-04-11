import serviceProducts from '../services/products.js'

export default {
    initProducts: async (req, res) => {
            res.render('products.ejs')
    },
    
    getAllProducts: async (req, res) => {
        const productos = await serviceProducts.getAllProducts(req.params.id)
        if (productos.response == '404')
            return res.status(404).json(productos.info)
        else
            return res.json(productos)
    },

    getOneProduct: async (req, res) => {
        const producto = await serviceProducts.getOneProduct(req.params.id)
        if (producto.response == '404')
            return res.status(producto.response).json(producto.info)
        else
            return res.json(producto)
    },
    
    saveProduct: async (req, res) => {
        const producto = await serviceProducts.saveProduct(req.body)
        return res.status(producto.response).json(producto.info)
    },

    deleteOneProduct: async (req, res) => {
        const producto = await serviceProducts.deleteOneProduct(req.params.id)
        return res.status(producto.response).json(producto.info)
    },

    updateOneProduct: async (req, res) => {
        const producto = await serviceProducts.updateOneProduct(req.body , req.params.id)
        return res.status(producto.response).json(producto.info)
    }
}
  
