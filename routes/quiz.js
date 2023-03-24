const route = require("express").Router()
const Quizs = require("../model/quiz")

route.get("/",async(req,res)=>{
    const user = await Quizs.find()
    res.json(user)
})

module.exports = route