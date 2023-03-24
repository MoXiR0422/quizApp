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
    score:{
        type:Number
    },
    mySubject:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    },
    activeTime:{
        type:Array
    }
})