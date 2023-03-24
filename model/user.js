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
    score:[
        {
            subjectName:String,
            score:Number
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
    }
})
module.exports= mongoose.model("Member",Schema)