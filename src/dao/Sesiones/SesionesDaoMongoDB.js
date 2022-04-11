import {optionsMongDB} from '../../config/cfgMongoDB.js'  
import {sesionesCliente} from '../../models/session.js'
import mongoose from 'mongoose'
const sesionesDAO = mongoose.model('sessions', sesionesCliente)

class ContenedorSesiones {

    async connectDB() {
        await   mongoose.connect(optionsMongDB.uri, {
                serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
    }

    async disconnectDB() {
        await mongoose.disconnect()
    }

    //Obtiene si la cookie está todavía
    async getByID(sessionid) {
        await this.connectDB()
        const contenido = await sesionesDAO.findOne({ _id: sessionid}, {_id: 0} )
        if (contenido == '') {
            this.disconnectDB()
            return ({ error : 'producto no encontrado' })
        } else {
            this.disconnectDB()
            return contenido
        }
    }

    async getByUser(username) {
        await this.connectDB()
        const user = await sesionesDAO.findOne({ usuario: username}, {_id: 0} )
        if (user == '') {
            this.disconnectDB()
            return ({ error : 'El usuario no existe' })
        } else {
            this.disconnectDB()
            return user
        }
    }

    async addUser(username, email, pass, role) {
        await this.connectDB()
        await sesionesDAO.insertMany({ usuario: username}, {email: email}, {password: pass}, {role: role})
        await this.disconnectDB()
    }


}

export default {ContenedorSesiones}