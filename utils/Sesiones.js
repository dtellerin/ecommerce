import express, { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import {PersistenciaSesiones} from '../models/daos/index.js'
import {optionsMongDB} from '../config/cfgMongoDB.js' 
import {isAuth} from './auth.js'
import passport from './passport.js'
import logger  from './logger.js'
import dotenv from 'dotenv'
dotenv.config({ path: `./config/config.env` })

const sesiones = await PersistenciaSesiones()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const routerSesiones = Router()
const timerSession = (process.env.SESSION_TIME * 1000)

/* --------------------- MIDDLEWARE --------------------------- */

routerSesiones.use(session({
    store: MongoStore.create({
      mongoUrl: optionsMongDB.uri,
      mongoOptions: advancedOptions
  }),
      secret: 'shhhhhhhhhhhhhhhhhhhhh',
      resave: false,
      saveUninitialized: false,
      cookie: {
      maxAge: timerSession
  }
}))

routerSesiones.use(passport.initialize());
routerSesiones.use(passport.session());
routerSesiones.use(express.json())

/* --------------------- ROUTES --------------------------- */


routerSesiones.get('/register', (req, res) => {
  logger.info('[', req.sessionID, ']: Nuevo registro ')
  res.render('register')
})

routerSesiones.post('/register', 
  passport.authenticate('register', 
    { failureRedirect: './failregister', successRedirect: './' }
  )
)

routerSesiones.post('/login', 
  passport.authenticate('login', 
    { failureRedirect: './faillogin', failureMessage: true , successRedirect: './main' }
  )
)

routerSesiones.get('/', async (req, res) => {
  logger.info('[', req.sessionID, ']: Inicia una nueva sesion')
  const sessiones = await sesiones.getByID(req.sessionID)
  if (sessiones == null ) {
    logger.info('[', req.sessionID, ']: Logueo nuevo')
    res.render('indexLogin') }
  else {
    logger.info('[', req.sessionID, ']: Usuario ya conectado')
    res.redirect('/api/sesion/main')
   }
})

routerSesiones.get('/main', isAuth, (req, res) => {
  const nombre =  req.user.usuario
  logger.info('[', req.sessionID, ']: Pagina principal para usuario: ', req.user.usuario)
  res.render('mainPage', {nombre})
})

routerSesiones.get('/faillogin', (req, res) => {
  logger.error('[', req.sessionID, ']: Clave incorrecta para usuario: ', req.user.usuario)
  res.render('login-error');
})

routerSesiones.get('/failregister', (req, res) => {
  logger.error('[', req.sessionID, ']: Falla registro de nuevo usuario: ', req.user.usuario)
  res.render('register-error');
})

routerSesiones.get('/logout', (req, res) => {
    const nombre = req.user.usuario
    req.session.destroy(err => {
        if (!err) 
          res.render('logout', {nombre}),
          logger.info('[', req.sessionID, ']: Desconexión usuario: ',  req.user.usuario)
        else 
        logger.error('[', req.sessionID, ']: Error de desconexion'),
        res.send({ error: 'olvidar', body: err })
          
    })
})


export default routerSesiones



