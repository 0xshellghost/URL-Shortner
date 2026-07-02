const mongoose=require('mongoose');
const urlschema=new mongoose.Schema(
   {
     shortID: {
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
   },
   {timestamps:true}
)
const URL=mongoose.model('urls',urlschema);
module.exports=URL;