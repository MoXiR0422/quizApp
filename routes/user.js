const route = require("express").Router()
const Users = require("../model/user")
const { regis, verifyEmail, login, logOut, editUser, 
    forgotPassword, updatePassword, 
    deleteAccount, verifyDelete } = require('../controllers/userCtrl')
const { authMiddleWare } = require('../middleware/authmiddleware')



route.post("/regis", regis)
route.get('/verify/:uniquinumber', verifyEmail)
route.post('/login', login)
route.get('/logout', authMiddleWare, logOut)
route.put('/update', authMiddleWare, editUser)
route.post('/forgot', forgotPassword)
route.put('/updatePass/:id', updatePassword)
route.get('/deleteAccount', authMiddleWare, deleteAccount)
route.get('/verifyDelete', verifyDelete)


module.exports = route