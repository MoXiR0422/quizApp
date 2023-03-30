const route = require("express").Router()

const {
    addQuiz,
    getQuiz,
    deleteQuiz,
    answerQuiz
} = require("../controllers/quizCtrl")


route.post("/addQuiz",addQuiz)
route.post("/getQuiz",getQuiz)
route.delete("/deleteQuiz",deleteQuiz)

route.post("/answerQuiz",answerQuiz)

module.exports = route