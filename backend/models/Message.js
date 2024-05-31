const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        
    },
    image: 
        {
            type: String,  // URL of the image
           // filename: String,  // Filename of the image
            // Add more properties as needed (e.g., size, type, etc.)
        }
    
},{timestamps:true})

module.exports = new mongoose.model("Message" , messageSchema)