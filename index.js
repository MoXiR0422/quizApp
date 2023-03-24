const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const Dbconnect = require("./config/dbConnect")

app.use(express.json)
app.use(bodyParser.urlencoded({extended:true}))
Dbconnect()

const PORT = process.env.PORT || 8000


app.listen(PORT,()=>{
    console.log("server is running");
})
