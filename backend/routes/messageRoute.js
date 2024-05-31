const express = require('express')
const router = express.Router()
const {sendMessage , getMessage, getLastMessage} =require('../controller/messageController')
const protectRoute = require('../middleware/protectRoute')

router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)
router.get("/lastmessage/:id", protectRoute, getLastMessage)


module.exports = router