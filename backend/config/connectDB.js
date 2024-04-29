const mongoose = require('mongoose')

const connectingDB=()=>{

    mongoose.connect("mongodb+srv://ghri1810:12345@cluster0.fcooxga.mongodb.net/")
    .then(console.log("connected to DB"))
    .catch((err)=>{console.log(err)})
}

module.exports = connectingDB






