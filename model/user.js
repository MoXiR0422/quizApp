const mongoose = require("mongoose")
 
const Schema = new mongoose.Schema({
    username:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    lastGetQuiz:Array,
    score:[
        {
            subjectName:String,
            score:Array
        }
    ],
    mySubject:[{
        type:String,
    }],
    active:{
        type:Boolean,
        default:false
    },
    activeTime:{
        type:Array
    },
    getQuiz:{
        SubjectName:String,
        Quizs:Array,
        QuizTime:Number
    }
})


module.exports= mongoose.model("Member",Schema)

