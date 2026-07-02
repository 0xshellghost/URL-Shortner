const mongoose=require('mongoose');
async function connectToMongoDb(url){
    return mongoose.connect(url).then(console.log("Connected to mongoDB")).catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    });
}
module.exports=connectToMongoDb;