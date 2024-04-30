const generateToken = require("../config/generateJwt")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

 const signup = async(req , res)=>{
    try{
        console.log(req.body)
        const {fullname , username, password, cpassword, gender} = req.body
    if(password !== cpassword){
       return res.status(400).json("Password and confirm password do not matched")
    }

    const user = await User.findOne({username})
    if(user){
        return res.status(400).json("This username has been already taken")
    }

    //HASHPASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    //profile pic 
    const boypp = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlpp = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilepic: gender === 'male' ? boypp : girlpp
    })

    if(newUser){
        
        await newUser.save()
        const token = jwt.sign({id : newUser._id} , `${process.env.JWT_SECRET_KEY}` , {
            expiresIn:'15d'
        })
        return res.status(201).json({
            _id:newUser._id,
            fullname: newUser.fullname,
            gender: newUser.gender,
            token:token
        })
    }else{
        res.status(400).json({error :"Invalid user data"})
    }

   
    }catch(err){
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
    
}

 const login = async(req , res)=>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username and password"})
        }

        //generateToken(user._id , res)
        const token = jwt.sign({id : user._id} , `${process.env.JWT_SECRET_KEY}` , {
            expiresIn:'15d'
        })

        return res.status(200).json({
            _id:user._id,
            username:user.username,
            gender:user.gender,
            token:token

            

        })
    }catch(err){
        console.log(err)
    }  
}

 const logout = (req , res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json("user logged out successfully")
    }catch(err){
        console.log(err)
    }
}

module.exports = {signup , login , logout}