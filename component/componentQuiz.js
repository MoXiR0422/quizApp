const User = require("../model/user")
const Score = require("../model/score")

const Deadline = async(userId) => {
    const user = await User.findById(userId)
    setInterval(async()=>{
        user.getQuiz.QuizTime = `${user.getQuiz.QuizTime}` - 1; 
        await user.save()
    },1000)
}

const YourScore = async (subjectName,answerMassiv,correct,mistake,userId) => {
    try{
        let date = new Date()
        let time = [date.getUTCFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes()] 
        let user = await Score.findOne({userId:userId})
        let ressultt = {
            subjectName:subjectName,
            score:[
                {
                    date:time,
                    score:correct,
                    mistake:mistake,
                    view:answerMassiv
                }
            ],
            averageRating:correct,
            try:1
        }
        if(user){
            user.scores.find(key => {
                if(key.subjectName == subjectName){
                    let averageRating = (key.averageRating + correct)/key.try + 1
                    key.score.push(ressultt.score[0])
                    key.averageRating = averageRating
                    key.try = key.try + 1
                }
            })
            await user.save()
        }else{
            let newScor = {
                userId:userId,
                scores:[ressultt],
            }
            let newUser = new Score(newScor)            
            await newUser.save()
        }
    }catch(error){
        throw new Error(error)
    }
}



module.exports = {
    Deadline,
    YourScore
}