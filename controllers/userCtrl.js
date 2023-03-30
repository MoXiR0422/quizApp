const Auth = require('../model/user')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../config/generateToken')
const { generateRefreshToken } = require('../config/refreshToken')
const { serviceEmail } = require('../utils/nodemailer')
const crypto = require('crypto')
let pass;
let randomize = ''
function generateNumber(){
    for(let i = 0; i < 6; i++){
        var number = Math.floor((Math.random() * 6))
        randomize += number
    }
    return randomize
}

//registration
const regis = asyncHandler(async(req, res) => {
    const { email } = req.body
    const find = await Auth.findOne({email})
    if(!find){
        const uniquinumber = generateNumber()
        const isValid = false
        const newUser = new Auth({isValid, uniquinumber, ...req.body})
        let url = `Пожалуйста подтвердите email нажмите на ссылку <a href="http://localhost:8000/api/auth/verify/${uniquinumber}">Нажмите сюда</a>`
        let data = {
            from: "kutubxona655@gmail.com",
            to: email,
            subject: `Привет ${email}`,
            text: url
        }
        serviceEmail(data)
        await newUser.save()
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
    const { id } = req.user
    console.log(id)
    const find = await Auth.findOne({ _id: id })
    if(find){
       const update = await Auth.findByIdAndUpdate(find.id, {
        username: username,
        lastName: lastName,
        password: password
       }) 
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
        generateNumber()
        serviceEmail(email, randomize)
        pass = randomize
        res.json(find.id)
    }else{
        throw new Error('not sended')
    }
})

const verifyCode = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { code } = req.body
    const find = await Auth.findById({_id: id})
    if(find){
        if(code === pass){
            res.json(id)
        }else{
            throw new Error(false + "code")
        }
    }else{
        throw new Error('note verification')
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
        throw new Error('error update password!')
    }
})

//delete account
const deleteAccount = asyncHandler(async(req, res) => {
    const { id } = req.user
    const find = await Auth.findById({_id: id})
    if(find){
        let email = find.email
        generateNumber()
        serviceEmail(email, randomize)
        pass = randomize
        res.json(find.id)
    }else{
        throw new Error('error delete!')
    }
})

const verifyCodeForDelete = asyncHandler(async(req, res) => {
    const { code } = req.body
    const { id } = req.params
    const find = await Auth.findById({_id: id})
    if(find){
        if(code == pass){
            res.json(find.id)
        }else{
            throw new Error('err note compare code == pass')
        }
    }else{
        throw new Error('err not find email verify delete!')
    }
})

//verify delete account
const verifyDelete = asyncHandler(async(req, res) => {
    const { id } = req.params
    const find = await Auth.findById({ _id: id })
    if(find){
        const deletAccount = await Auth.findByIdAndDelete({ _id: id })
        res.json('Profile deleted successfully!')
    }else{
        throw new Error('note deleted')
    }
})

//get user profil
const userProfil = asyncHandler(async(req, res) => {
    res.json(req.user)
})

module.exports = { 
    regis, 
    verifyEmail,
    login, 
    logOut, 
    editUser, 
    forgotPassword, 
    verifyCode,
    updatePassword, 
    deleteAccount,
    verifyCodeForDelete,
    verifyDelete,
    userProfil
}