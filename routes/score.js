const route = require("express").Router()
const Score = require("../model/score")
const getAllScore = require("../controllers/scoreCtrl")

route.post("/getAllScore",getAllScore)

module.exports = route