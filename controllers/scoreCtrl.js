const Score = require("../model/score")

const userGetAllScore = async(req,res) => {
    try{
        const { Id } = req.params
        const user = await Score.findOne({userId:Id})
        res.json(user)
    }catch(error){
        throw new Error(error)
    }
}
module.exports = {
    userGetAllScore
}