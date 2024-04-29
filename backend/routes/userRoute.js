const router = require('express').Router()
const {sidebarUsers , chatwindowUser} =require("../controller/userController")
const protectRoute = require('../middleware/protectRoute')

router.get("/" , protectRoute, sidebarUsers)
router.get("/:id" , protectRoute, chatwindowUser)



module.exports = router