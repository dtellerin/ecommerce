import serviceOrders from '../services/orders.js'

export default {
    
    getOrders: async(req, res) => { 
        return res.render('orders.ejs')
    },

    getAllOrders: async(req, res, next) => { 
        try{
            const ordenes = await serviceOrders.getAll()
            if(ordenes.msg == 'Ok') 
                res.json(ordenes.info) 
             else 
                res.status(400).json(ordenes.info)
        }
        catch(error){
            next(error)
        }
    },

    getOrderById: async(req, res, next) => { 
        try{ 
            const orden = await serviceOrders.getOrderById(req.params.id)
            if(orden.msg == 'Ok') 
                res.json(orden.info) 
            else 
                res.status(400).json(orden.info)
        }
        catch(error){
            next(error)
        }
    },

    getOrdersByEmail: async(req, res, next) => { 
        try{ 
            const ordersByEmail = await serviceOrders.getByEmail(req.params.email)
            if(ordersByEmail.msg == 'Ok') 
                res.json(ordersByEmail.info) 
            else 
            res.status(400).json(ordersByEmail.info) 
        }
        catch(error){
            next(error)
        }
    },


    processOrder: async(req, res, next) => { 
        try{ 
            const processOrderId = await serviceOrders.processOrder({email: req.params.email, id_order: req.params.id})
            if(processOrderId.msg =='Ok') 
                res.json(processOrderId.info) 
            else 
                res.status(400).json(processOrderId.info)
        }
        catch(error){
            next(error)
        }
    }
}