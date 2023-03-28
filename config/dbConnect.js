const mongoose = require("mongoose")

const Dbconnect = async () => {
    mongoose.set("strictQuery",false)
    await mongoose.connect("mongodb://127.0.0.1:27017/quiz")
    .then(()=>{
        console.log("connect to mongodb");
    })
    .catch((err)=>{
        console.log("connection error");
    })
}

module.exports = Dbconnect