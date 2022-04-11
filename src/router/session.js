import { Router } from 'express'
import controlSession from '../controllers/session.js'
import {auth} from '../utils/jwt.js'
import logger from '../utils/logger.js'

const routerSesiones = Router()

//-----------------LOGIN----------------------//
routerSesiones.post('/login', controlSession.postLogin)//-> Logueo de inicio
routerSesiones.get('/login', controlSession.getLogin)//-> Obtiene la primera pagina de inicio
routerSesiones.get('/main', controlSession.getMainPage)//-> Redirecciona a la pagina principal
routerSesiones.get('/login-error', controlSession.getLoginError)//-> Error de Login

//---------------REGISTER--------------------//
routerSesiones.post('/register', controlSession.postRegister)//-> Envia la peticion de registro de un nuevo usuario
routerSesiones.get('/register', controlSession.getRegister)//-> Obtiene la pagina de registro
routerSesiones.get('/register-error', controlSession.getRegisterError)//-> Error de registro

//---------------DATA AUTH-------------------//
routerSesiones.get('/auth', auth, (req, res) => { 
    res.json({msg: 'ok'})
})

//--------------INITIAL PAGE------------------//
routerSesiones.get('/', controlSession.getMain)//-> Pagina de inicio

//--------------------Route errors------------------------/
routerSesiones.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Something is wrong' })
})
//-----------------------------------------------------------//


export default routerSesiones



