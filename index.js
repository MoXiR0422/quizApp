const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Dbconnect = require("./config/dbConnect")
const userRoute = require("./routes/user")
const quizRoute = require("./routes/quiz")
const scoreRoute = require("./routes/score")

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
Dbconnect()




app.use("/api/auth/",userRoute)
app.use("/api/quiz/",quizRoute)
app.use("/api/score/",scoreRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log("server is running");
})
