const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum: ["male" ,"female"]
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = new mongoose.model("User" , userSchema)