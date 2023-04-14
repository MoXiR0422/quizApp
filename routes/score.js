const route = require("express").Router()
const Score = require("../model/score")
const {userGetAllScore} = require("../controllers/scoreCtrl")

route.post("/getAllScore", userGetAllScore)

module.exports = route