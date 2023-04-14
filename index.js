const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require('morgan')
const helmet = require('helmet')
const passport = require('passport') 
const session = require('express-session')

const Dbconnect = require("./config/dbConnect")
const userRoute = require("./routes/user")
const quizRoute = require("./routes/quiz")
const scoreRoute = require("./routes/score")

Dbconnect()
require('./config/passport')
require('dotenv').config()


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(helmet())


app.use("/api/auth",userRoute)
app.use("/api/quiz",quizRoute)
app.use("/api/score",scoreRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log("server is running");
})