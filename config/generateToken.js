const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: "1d"})
}

const signAccessToken = async(useerId) => {
    return new Promise((resolve, reject) => {
        let payload = {
            name: "yours curly"
        }
        const option = {}
        jwt.sign(payload, process.env.TOKEN_SECRET, option, (err, token) => {
            if(err) return reject(err)
            resolve(token)
        })
    })
}

module.exports = { generateToken, signAccessToken }