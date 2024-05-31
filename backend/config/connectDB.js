const mongoose = require('mongoose')

const connectingDB=()=>{

    mongoose.connect(process.env.DB)
    .then(console.log("connected to DB"))
    .catch((err)=>{console.log(err)})
}

module.exports = connectingDB






