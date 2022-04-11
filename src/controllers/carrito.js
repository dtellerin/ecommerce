import serviceCarrito from '../services/carrito.js'

export default {
    getInitialCarrito: async(req, res) => {
        return res.render('carritos.ejs') 
    },
    
    getAllCarritos: async(req, res, next) => { //Devuelve todos los carritos
        try{
            const carritos = await serviceCarrito.getAll()
            if (carritos.msg == 'Ok')
                res.json(carritos.info)
            else
                res.status(400).json({error: carritos.info})
        }
        catch(error){
            next(error)
        }
    },

    getProductosByIdCarritosApi: async(req, res, next) => { 
        try{ 
            const productos = await serviceCarrito.getProductsByIdCarrito(req.params.id)
            if(productos.msg == 'Ok') 
                res.json(productos.info) 
            else 
                res.status(400).json({ error : productos.info })
        }
        catch(error){
            next(error)
        }
    },  

    postCarritosApi: async(req, res, next) => { 
        try{
            const id = await serviceCarrito.addNewCarrito(req.body)
            if(id.msg == 'Ok') 
                res.json({id: id.info})
            else 
                res.status(400).json({ error : id.info })
        }
        catch (error){
            next(error)
        }
    },

    deleteCarritoById: async (req,res,next) => { 
        try{ 
            const resultado = await serviceCarrito.deleteCarritoById(req.params.id)
            if(resultado.msg == 'Ok')
                res.json({ resultado: resultado.info })
            else 
                res.status(400).json({ error : resultado.info })
        }
        catch(error){
            next(error)
        } 
    },

    deleteProductByCarritoId: async(req,res,next)=>{ //Elimina producto del carrito
        try{ 
            const resultado = await serviceCarrito.deleteProductByCarritoId( {idCarrito: req.params.id_carrito, idProd: req.params.id_prod})
            if(resultado.msg == 'Ok')
                res.json({ resultado: resultado.info })
            else 
                res.status(400).json({ error : resultado.info })
        }
        catch(error){
            next(error)
        }
    },

    addProductByCarritoId: async(req,res,next)=>{ //Agrega producto al carrito
        try{ 
            const idCarrito = req.params.id_carrito
            const idProd = req.params.id_prod
            const idProdQuantity = req.params.id_prod_quantity
            const carrito = serviceCarrito.addProductByIdCarrito({idCarrito: idCarrito, idProd: idProd, idProdQuantity: idProdQuantity})
            .then((carrito) => {
                if(carrito.msg == 'Ok'){
                    res.json({ resultado: carrito.info })
                } 
                else res.status(400).json({ error : carrito.info })
            })
        }
        catch(error){
            next(error)
        }
    },

    processingOrder: async(req,res,next)=>{ //compra carrito
        try{ 
            const id = req.params.id;
            const orden = serviceCarrito.processingOrderByCarritosId(id) 
            .then((orden) => {
                if(orden.msg == 'Ok'){
                    res.json({ id: orden.info })
                } 
                else res.json({ error : orden.info })
            })
        }
        catch(error){
            next(error)
        }
    },

    getCarritosByEmail: async(req, res, next) => { 
        try{ 
            const carritos = await serviceCarrito.getByEmail(req.params.email)
            if(carritos.msg == 'Ok') 
                res.json(carritos.info) 
            else 
                res.status(400).json({ error : carritos.info })
        }
        catch(error){
            next(error)
            res.json({"error": error})
        }
    }
}
/*-----------------------------------------------------------*/