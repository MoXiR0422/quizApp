const nodemailer = require('nodemailer')
const Auth = require('../model/user')
const asyncHandler = require('express-async-handler')

//forgot password and delete account
const serviceEmail = asyncHandler(async(email, pass) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kutubxona655@gmail.com",
            pass: "afrbijcfijrbmhzk"
        }
    })

    let options = {
        from: "Service Quiz app",
        to: `${email}`,
        subject: 'secret key',
        text: `${pass}`
    }

    transport.sendMail(options, (err, info) => {
        if(err){
            throw new Error(err)
        }else{
            res.json("send to email user" + info.response)
        }
    })
})

 
module.exports = { serviceEmail }