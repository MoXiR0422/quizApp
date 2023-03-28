const route = require("express").Router()
const Score = require("../model/socre")

route.post("/getAllScore",async(req,res)=>{
    try{
        const {userId} = req.body
        const user = await Score.findOne({userId:userId})
        if(user){
            res.json(user.scores)
        }else{
            res.json("not found user Score")
        }    
    }catch(error){
        throw new Error(error)
    }
})

route.post("/AnswerQuiz", async(req,res) => {
    
})

module.exports = route