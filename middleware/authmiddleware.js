const Auth = require('../model/user')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
require('dotenv').config()


const authMiddleWare = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
                const user = await Auth.findById(decoded?.id)
                req.user = user
                next()
            }else{
                throw new Error('err authmiddleware')
            }
        }catch(err){
            throw new Error(err)
        }
    }
})


module.exports = { authMiddleWare }