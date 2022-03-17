
import bCrypt from 'bcrypt'

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login')
    }
  }
  
export  function createHash (password ) {
    return bCrypt.hashSync (
      password ,
      bCrypt.genSaltSync (10),
      null)
  }
  
export function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

//}

//export default {funcionesAuth}
