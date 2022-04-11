import sessionService from '../services/session.js'

export default {
    postLogin: async (req, res) => {
        const token = await sessionService.postLogin(req.body)
        if(token) 
           return res.json(token)
        else 
           return res.status(400).json({ error: 'Usuario y/o password incorrectos' })
    },

    getLogin: async (req, res) => {
         return res.render('login.ejs')
    },
    
    getLoginError: async (req, res) => {
       return res.status(400).json({error: 'Usuario y/o password incorrectos'})
    },

    getMainPage: async (req, res) => {
        return res.render('mainPage.ejs')
    },

    getMain: async (req, res) => {
        return res.render('main.ejs')
    },

    getRegister: (req, res) => {
        return res.render('register.ejs')
    },

    getRegisterError: (req, res) => {
        return res.status(409).json({error: 'Usuario ya creado'})
    },
    
    postRegister: async (req, res) => {
        const token = await sessionService.postRegister(req.body)
        if(token) 
           return res.json(token)
        else 
           return res.status(409).json({ error: 'Usuario ya creado' })
    }
}
  
