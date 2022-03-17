import passport  from 'passport'
import LocalStrategy from 'passport-local'
import dotenv from 'dotenv'
import {createHash, isValidPassword} from './auth.js'
import { PersistenciaUsuarios} from '../models/daos/index.js'
import EnviarMail from './email.js'

dotenv.config({ path: `../config/config.env` })

const usuarios = await PersistenciaUsuarios()
let user = []


passport.use('register', new LocalStrategy({
    passReqToCallback: true
    }, async (req, username, password, done) => {
  
        const { direccion, telefono, confirmPassword } = req.body
        const role = 'cliente'
        const usuario = await usuarios.getByUser(username)
  
        if (usuario) {
          return done('already registered')
        }
        if (password != confirmPassword) {
          return done('Las claves no coinciden')
        }
          password = createHash(password)
          user = Object.assign({usuario: username}, {password: password}, {telefono: telefono}, {email: direccion}, {role: role})
          user = await usuarios.addUser(user)
          EnviarMail( process.env.EMAIL_FOR_NEWUSER, 'Nuevo Usuario Registrado', `Se registro el nuevo usuario ${username}`)
      return done(null, user)
  }))
  
  passport.use('login', new LocalStrategy( async (username, password, done) => {
      user = await usuarios.getByUser(username)
    
       if (!user) {
        return done(null, false)
      }
  
      if (!isValidPassword(user, password)) {
        return done(null, false);
      }
  
    return done(null, user)
  
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser(async (id, done) => {
    const usuario = await usuarios.getByUserId(id)
    done(null, usuario)
  })

export default passport

