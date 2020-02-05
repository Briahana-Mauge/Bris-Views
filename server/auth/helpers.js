const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const password_digest = await bcrypt.hash(password, salt);
        // console.log('salt', salt)
        // console.log('pass', password_digest)
        return password_digest
    } catch (err) {
        console.log('error', err)
    }
}

const comparePasswords = async (candidatePassword, passwordDigest) => {
    try {
        const match = await bcrypt.compare(candidatePassword, passwordDigest)
        return match
    } catch (err) {
        console.log('error', err)
    }
}
const loginRequired = (req, res, next) => {
    console.log("helper running", req.session)
    if (!req.user) {
        res.status(401).json({
            payload: null,
            msg: "You need to be logged in to access this route",
            err: true
          })
          return;
    }
    next()

  }
  
module.exports = {
    hashPassword, 
    comparePasswords,
    loginRequired
}