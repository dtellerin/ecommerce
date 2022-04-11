import { PersistenciaUsuarios} from '../dao/index.js'
import {createHash, isValidPassword} from '../utils/auth.js'
import {generateAuthToken} from '../utils/jwt.js'
import EnviarMail from '../utils/email.js'
import dotenv from 'dotenv'

dotenv.config({ path: `../config/config.env` })
const usuarios = await PersistenciaUsuarios()

export default {

 postLogin: async (user) => {
    const { email, password } = user
    const usuario = await usuarios.getByUser(email)
    
    if (!usuario) {
        return ({ error: 'usuario no registrado' })
    }
  
    if (!isValidPassword(usuario, password)) {
      return ({ error: 'credenciales invalidas' })
    }
  
    usuario.contador = 0
    const access_token = generateAuthToken(usuario)
    return  ({
        email,
        access_token
    })
  },
  
  postRegister: async (user) => {
    const { email, telefono, confirmPassword, password, nombreApellido } = user
    const usuario = await usuarios.getByUser(email)
    if (usuario) {
        return ({ error: 'el nombre de usuario ya existe' })
    }
 
    if (password != confirmPassword) {
      return done('Las claves no coinciden')
    }

      const hashPassword = createHash(password)
      const role = 'cliente'
      user = Object.assign({nombre: nombreApellido}, {password: hashPassword}, {telefono: telefono}, {email: email}, {role: role})
      user = await usuarios.addUser(user)
      
      EnviarMail( process.env.EMAIL_FOR_NEWUSER, 
                  'Nuevo Usuario Registrado',   
                  `Se registro un nuevo usuario. <br>
                  Usuario: ${email} <br>
                  Nombre: ${nombreApellido} <br>
                  telefono: ${telefono} <br>`)
  
    const access_token = generateAuthToken(usuario)
    return  ({
      email,
      access_token
  })
  }
}



  