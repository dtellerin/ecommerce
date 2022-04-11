export async function PersistenciaProductos() {
    const {default: conte} = await import('./Productos/ProductosDaoMongoDB.js')
    return new conte.ContenedorProductos()
}

export async function PersistenciaCarritos() {
    const {default: conte} = await import('./Carritos/CarritoDaoMongoDB.js')
    return new conte.ContenedorCarrito()
}

export async function PersistenciaChat() {
    const {default: conte} = await import('./Chat/ChatDaoMongoDB.js')
    return new conte.ContenedorCarrito()
}
    
export async function PersistenciaSesiones() {
    const {default: conte} = await import('./Sesiones/SesionesDaoMongoDB.js')
     return new conte.ContenedorSesiones()
}

export async function PersistenciaUsuarios() {
    const {default: conte} = await import('./Sesiones/UsuariosDaoMongoDB.js')
    return new conte.ContenedorUsuarios()
}

export async function PersistenciaOrders() {
    const {default: conte} = await import('./Orders/OrdersDaoMongoDB.js')
    return new conte.ContenedorOrders()
}


