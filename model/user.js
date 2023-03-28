const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
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
    googleId: String,
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
        type: Boolean,
        default:false
    },
    activeTime:{
        type:Array
    },


    refreshToken: String,
    uniquinumber: String,
    isValid: {
        type: Boolean,
        default: false
    },
    
})

Schema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()

    getQuiz:{
        SubjectName:String,
        Quizs:Array,
        QuizTime:Number

    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


Schema.methods.isPasswordMatched = async function(enterPass){
    return await bcrypt.compareSync(enterPass, this.password)
}

Schema.methods.hashingPassword = async(enterPass) => {
    return bcrypt.hashSync(enterPass, 10)
}

module.exports= mongoose.model("Member",Schema)

