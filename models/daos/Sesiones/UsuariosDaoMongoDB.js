import {optionsMongDB, usuarios} from '../../../config/cfgMongoDB.js'  //archivo de configuracion
import mongoose from 'mongoose'
const usuariosDAO = mongoose.model('usuarios', usuarios)

class ContenedorUsuarios {

    async connectDB() {
        await   mongoose.connect(optionsMongDB.uri, {
                serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
        // console.log('Base de datos conectada')
    }

    async disconnectDB() {
        await mongoose.disconnect()
        // console.log('Base de datos desconectada')    
    }

    async getByUser(username) {
        await this.connectDB()
        const user = await usuariosDAO.findOne({ usuario: username} )
        this.disconnectDB()
        return user
    }

    async getByUserId(id) {
        await this.connectDB()
        const user = await usuariosDAO.findOne({ _id: id} )
        if (user == '') {
            this.disconnectDB()
            return ({ error : 'El usuario no existe' })
        } else {
            this.disconnectDB()
            return user
        }
    }

    async addUser(user) {
        await this.connectDB()
        user = await usuariosDAO.insertMany(user)
        user = user[0]
        await this.disconnectDB()
        return user
    }


}

export default {ContenedorUsuarios}