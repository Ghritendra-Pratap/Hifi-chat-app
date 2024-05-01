const User = require("../models/User")

const sidebarUsers = async(req,res)=>{
    const loggedInUser = req.user._id
    const allUsers = await User.find({_id: {$ne: loggedInUser} }).select("-password")
    return res.status(200).json(allUsers)
}

const chatwindowUser = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const user = await User.findOne({_id:id}).select("-password")
    return res.status(200).json(user)

}

module.exports = {sidebarUsers , chatwindowUser}