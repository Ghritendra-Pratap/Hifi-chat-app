const User = require("../models/User")
const jwt = require('jsonwebtoken')

const protectRoute = async(req,res, next) =>{
    try{
        const token = req.get('authorization');
        // const token = req.cookies.jwt;
        if(!token){
            return res.status(500).json({error: "Unauthorized - No token provided"})
        }
        const decoded = jwt.verify(token , `${process.env.JWT_SECRET_KEY}`)
        if(!decoded){
            return res.status(500).json({error: "Unauthorized - Invalid token"})
        }
       
        
        const user = await User.findOne({ _id: decoded.id })
        
        for (let i  = 0; i < 1000;i++) {
            const element =5;
            
        }
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        req.user = user
        next();

    }catch(err){
        console.log("error in protect route:  " , err)
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = protectRoute