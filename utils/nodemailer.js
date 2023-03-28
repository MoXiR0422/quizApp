const nodemailer = require('nodemailer')
const Auth = require('../model/user')
const asyncHandler = require('express-async-handler')

//forgot password and delete account
const serviceEmail = asyncHandler(async(data, req, res) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kutubxona655@gmail.com",
            pass: "afrbijcfijrbmhzk"
        }
    })

    let options = {
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text
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