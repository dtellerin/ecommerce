import sessionService from '../services/session.js'

export default {
    //vista de mensajes
    getChats: async(req, res) => {
        return res.render('chat.ejs')
    },
    //vista de mensajes del usuario
    getUserChats: async(req, res) => {
        return res.render('chatByUser.ejs')
    }
}
