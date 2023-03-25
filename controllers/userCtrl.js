const Auth = require('../model/user')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/generateToken')
const { generateRefreshToken } = require('../config/refreshToken')
const { serviceEmail } = require('../utils/nodemailer')
const crypto = require('crypto')

function generateNumber(){
    let rand = ''
    for(let i = 0; i < 6; i++){
        var number = Math.floor((Math.random() * 100000) + i)
    }
    rand += number
    return rand
}

//registration
const regis = asyncHandler(async(req, res) => {
    const { email } = req.body
    const find = await Auth.findOne({email})
    if(!find){
        const uniquinumber = generateNumber()
        const isValid = false
        const newUser = new Auth({isValid, uniquinumber, ...req.body})
        await newUser.save()
        let url = `Пожалуйста подтвердите email нажмите на ссылку <a href="http://localhost:8000/api/auth/verify/${uniquinumber}">Нажмите сюда</a>`
        let data = {
            from: "kutubxona655@gmail.com",
            to: email,
            subject: `Привет ${email}`,
            text: url
        }
        serviceEmail(data)
        res.json('sended')
    }else{
        throw new Error('User already exist!')
    }
})

//verify account
const verifyEmail = asyncHandler(async(req, res) => {
    const { uniquinumber } = req.params
    const user = await Auth.findOne({uniquinumber: uniquinumber})
    if(user){
        user.isValid = true
        await user.save()
        res.json('registration successful')
    }else{
        throw new Error('Error regis')
    }
})


//login
const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const find = await Auth.findOne({ email: email })
    const validPass = await find.isPasswordMatched(password)
    if(find && validPass){
        const refresh = generateRefreshToken(find?.id)
        const updateToken = await Auth.findByIdAndUpdate(find?.id, {
            refreshToken: refresh
        }, { new: true })
        res.cookie('cookie', refresh, {
            httpOnly: true,
            maxAge: 60 * 60 * 70 * 1000
        })

        res.json({
            _id: find?._id,
            username: find?.username,
            lastName: find?.lastName,
            email: find?.email,
            token: generateToken(find?.id)
        })
    }else{
        throw new Error('not registered!')
    }
})

//log out
const logOut = asyncHandler(async(req, res) => {
    res.clearCookie('cookie')
    res.json('log out!')
})


//edit
const editUser = asyncHandler(async(req, res) => {
    const { username, lastName, password } = req.body
    const find = await Auth.findOne({
        username: username,
        lastName: lastName,
        password: password
    })
    if(!find){
       const update = await Auth.updateOne(req.body) 
       res.json(update)
    }else{
        throw new Error('not update')
    }
})

//forgot password
const forgotPassword = asyncHandler(async(req, res) => {
    const { email } = req.body
    const find = await Auth.findOne({email})
    if(find){
        const url = `Пожалуйста подтвердите email нажмите на ссылку <a href="http://localhost:8000/api/auth/updatePass/${find._id}">Нажмите сюда</a>`  
        const data = {
            from: "kutubxona655@gmail.com",
            to: find.email,
            subject: `Привет ${find.email}`,
            text: url
        }

        serviceEmail(data)
        res.json('send')
    }
})

const updatePassword = asyncHandler(async(req, res) => {
    const { passwordUser } = req.body
    const { id } = req.params
    const find = await Auth.findById({_id: id})
    if(find){
        const hashing = crypto.createHash('sha256').update(passwordUser).digest('hex')
        const update = await Auth.findOne({
            password: hashing
        })
        console.log(passwordUser)
        find.password = passwordUser
        await find.save()
        res.json(find)
    }else{
        throw new Error('note updated password')
    }
})

//delete account
const deleteAccount = asyncHandler(async(req, res) => {
    const { email } = req.body
    const find = await Auth.findOne(email)
    if(find){
        let url = `Пожалуйста подтвердите email нажмите на ссылку <a href="http://localhost:8000/api/auth/deleteAccount${find._id}">Нажмите сюда</a>`
        let data = {
            from: "kutubxona655@gmail.com",
            to: find.email,
            subject: `Привет ${find.email}`,
            text: url
        }

        res.json(`Confirmation email sent ${find.email}`)
    }
})

//verify delete account
const verifyDelete = asyncHandler(async(req, res) => {
    const { id } = req.params
    const find = await Auth.findById({ _id: id })
    if(find){
        const deletAccount = await Auth.findByIdAndDelete(id)
        res.json(deleteAccount)
    }else{
        throw new Error('note deleted')
    }
})


module.exports = { 
    regis, 
    verifyEmail,
    login, 
    logOut, 
    editUser, 
    forgotPassword, 
    updatePassword, 
    deleteAccount,
    verifyDelete
}