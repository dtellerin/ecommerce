export async function PersistenciaProductos() {
    const {default: conte} = await import('../daos/Productos/ProductosDaoMongoDB.js')
    return new conte.ContenedorProductos()
}

export async function PersistenciaCarritos() {
    const {default: conte} = await import('../daos/Carritos/CarritoDaoMongoDB.js')
    return new conte.ContenedorCarrito()
}

export async function PersistenciaChat() {
    const {default: conte} = await import('../daos/Chat/ChatDaoMongoDB.js')
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

