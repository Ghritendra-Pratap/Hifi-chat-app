const cloudinary_js_config  = require("../config/cloudinary");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { getReceiverSocketId, io } = require("../socket/socket");


const sendMessage=async(req,res)=>{
    try{
        const {image} = req.body
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id
        

        let conversation = await Conversation.findOne({
            participants:{$all : [senderId , receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId , receiverId]
            })
        }
        console.log(req.body)


        if(image){
            var result = await cloudinary_js_config.uploader.upload(image,{
                folder:'chatImage',
            })
        }
        

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image:image ? result.secure_url :""
           
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
            await conversation.updateOne({lastmessage : newMessage.message})
        }

        await Promise.all([conversation.save(), newMessage.save() ])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json("message sent ")

    }catch(err){
        console.log("error in send message:  " , err)
        res.status(500).json({error: "Internal server error"})
    }
}

const getMessage = async(req,res)=>{
    try{
        const {id: chatToUserId} =req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all: [senderId , chatToUserId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([]) 

        return res.status(200).json(conversation.messages)
    }catch(err){
        console.log("error in get message:  " , err)
        res.status(500).json({error: "Internal server error"})
    }
}

const getLastMessage=async(req,res)=>{
    try{
        const {id: chatToUserId} =req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all: [senderId , chatToUserId]}
        })

        if(!conversation){
            return 
        }

        return res.status(200).json(conversation.lastmessage)
    }catch(err){
        console.log("error in get last message :", err)
        res.status(500).json({error: "Internal server error"})
    }
}


module.exports={sendMessage , getMessage , getLastMessage}