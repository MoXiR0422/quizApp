const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    subjectName :String,
    questions:[{
        questionText: String, 
        examtype: String, // type writing or test
        answers: [
            { text: String , correct: {type:Boolean,default:false} },
        ]
    }]
})

module.exports = mongoose.model("Quiz", Schema)