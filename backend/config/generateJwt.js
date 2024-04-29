const jwt = require('jsonwebtoken')

const generateToken = (userId , res) =>{
    const token = jwt.sign({userId} , `${process.env.JWT_SECRET_KEY}` , {
        expiresIn:'15d'
    })
    
    res.json(token)
    // res.cookie("jwt",token ,{
    //     maxAge:15 * 24* 60 * 60* 1000,
    //     httpOnly:true,
    //     sameSite:"strict",
    //     secure: process.env.ENV !== 'development'
    // })
}

module.exports = generateToken