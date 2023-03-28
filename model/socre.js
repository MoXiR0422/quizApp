const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    userId:String,
    scores:[
        {
            subjectName:String,
            score:[
                {
                    date:Array,
                    score:Number
                }
            ]
        }
    ]
})


module.exports = mongoose.model("Score" , Schema)