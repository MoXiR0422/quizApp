const Quiz = require("../model/quiz")
const User = require("../model/user")
const {
    Deadline ,
    YourScore ,

} = require("../component/componentQuiz")

const addQuiz = async(req,res)=>{
    try{
        let quiz = req.body
        const subject = await Quiz.findOne({subjectName:quiz.subjectName})
        if(subject){
            await subject.questions.push(...quiz.questions)
            await subject.save()
            res.json(true)
        }else{
            const quizs = new Quiz(quiz)
            await quizs.save()
            res.json(quizs)    
        }    
    }
    catch(error){
        throw new Error(error)
    }
}


const getQuiz = async(req,res)=>{
    try{
        let time;
        const {userId, subjectName , quizType ,quizLimit} = req.body
        const sendQuiz = [],getQuizs = []
        const user = await User.findById(userId)
        const quizs = await Quiz.findOne({subjectName:subjectName})
        for(let key of quizs.questions)
            key.examtype === quizType ? sendQuiz.push(key) : " ";
        for(let i=0;i<=quizLimit-1;i++){
            let quiz = Math.floor((Math.random()*(quizs.questions.length-1))+i)
            getQuizs.push(quizs.questions[quiz])
        }
        if(20<=quizLimit && quizLimit<=30){
            time = 2700
        }
        if(30<quizLimit && quizLimit<=50){
            time = 4800
        }
        user.getQuiz = {
            SubjectName:`${subjectName}`,
            Quizs:getQuizs,
            QuizTime:time
        }
        timeForQuiz = time
        user.lastGetQuiz = getQuizs
        Deadline(userId)
        await user.save()
        await getQuizs ? res.json(getQuizs) : "";    
    }catch(error){
        throw new Error(error)
    }
}


const deleteQuiz = async(req,res) => {
    const {subjectName ,quizId} = req.body
    const subject = await Quiz.findOne({subjectName:subjectName})        
    let location = subject.questions.findIndex(key => key._id == quizId)
    subject.questions.splice(location,1)
    await subject.save()
    res.json(true)
}


const answerQuiz = async(req,res) => {
    try{
        const {userId,answers} = req.body
        const user = await User.findById(userId)
        let correct=0,mistake=0
        let answerMassiv =[]
        if(user.getQuiz.QuizTime){
            for(let i=0;i<answers.length;i++){
                user.getQuiz.Quizs.some(obj => {
                    if(`${obj._id}` === answers[i].questionId){
                        let ma = obj.answers.some(key => {
                            if(`${key._id}` === answers[i].answerId && key.correct === true){
                                answerMassiv.push(key);
                                correct += 1
                                return true
                            }
                        })
                        if(ma){
                        }else{
                            let mas = []
                            mas.push(answers[i])
                            console.log(obj.answers);
                            let ke = obj.answers.find(m => {
                                if(m.correct === true){
                                    mas.push(m)
                                    console.log(m);
                                }
                            })
                            mistake +=1
                            answerMassiv.push(mas)
                        }
                        }
                    }
                );
            }        
            let ress = YourScore(user.getQuiz.SubjectName,answerMassiv,correct,mistake,userId)
            user.getQuiz = []
            user.save()
            res.send(answerMassiv)            
        }else{
            res.json("quiz time ended")
        }
    }catch{(error)=>{
            throw new Error(error)
        }
    }
}



module.exports = {
    addQuiz,
    getQuiz,
    deleteQuiz,
    answerQuiz,
}