import controllerChat from '../controllers/chat.js'
import express from 'express'
import logger from '../utils/logger.js'

const { Router } = express
const routerChat = new Router()

//------------------Routes-------------------------------//
routerChat.get('/',controllerChat.getChats) //Vista de chat
routerChat.get('/:email',controllerChat.getUserChats) //Vista de chat del usuario


//--------------------Route errors------------------------/
routerChat.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Something is wrong' })
})
//-----------------------------------------------------------// 


export default routerChat