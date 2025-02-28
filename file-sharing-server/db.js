const mongoose = require("mongoose")

async function connectMongo(){
    console.log("connecting database ...");
    await mongoose.connect(process.env.MONGO_URI)
    .then(console.log("db connected..."))
    .catch((err)=>console.log("problem connecting with database"))
}

module.exports = {connectMongo};