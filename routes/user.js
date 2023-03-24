const route = require("express").Router()
const Users = require("../model/user")

route.get("/",async(req,res)=>{
    const user = await Users.find()
    res.json(user)
})

module.exports = route