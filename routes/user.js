const route = require("express").Router()
const Users = require("../model/user")
const { regis, verifyEmail, login, logOut, editUser, 
    forgotPassword, updatePassword, 
    deleteAccount, verifyDelete, userProfil } = require('../controllers/userCtrl')
const { authMiddleWare } = require('../middleware/authmiddleware')
const passport = require('passport')
// const session = require('express-session')
require('../config/passport')
require('dotenv').config()


route.post("/regis", regis)
route.get('/verify/:uniquinumber', verifyEmail)
route.post('/login', login)
route.get('/logout', authMiddleWare, logOut)
route.put('/update', authMiddleWare, editUser)
route.post('/forgot', forgotPassword)
route.put('/updatePass/:id', updatePassword)
route.get('/deleteAccount', authMiddleWare, deleteAccount)
route.get('/verifyDelete', verifyDelete)
route.get('/getprofil', authMiddleWare, userProfil)

route.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

route.get('/google/callback', passport.authenticate('google', {
    failureRedirect: "/login"
}), (req, res) => {
    res.end('Log in!')
})



module.exports = route