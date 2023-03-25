const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    SubjectName : {
        type:String,
        required:true
    },
    questions:[{
        questionText: String, 
        type: String, // type writing or test
        answers: [
            { text: String , correct: {type:Boolean,default:false} },
            { text: String , correct: {type:Boolean,default:false} },
            { text: String , correct: {type:Boolean,default:false} },
            { text: String , correct: {type:Boolean,default:false} }
        ]
    }]
})

module.exports = mongoose.model("Quiz", Schema)