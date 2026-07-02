const express=require('express');
const urlRoute=require('./routes/url');
const path=require('path');
const connectToMongoDb=require('./connect');
const url=require('./models/url');
const app=express();
app.use(express.json());
const Port=8001;
connectToMongoDb('mongodb://127.0.0.1:27017/url-shortner')
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));
app.use('/url',urlRoute);
app.get('/test',async(req,res)=>{
    const allurls=await url.find({});
   console.log("Data from DB:", allurls); 
    return res.render("home",{
        urls:allurls,
    });
})
app.get('/:shortId',async(req,res)=>{
    const shortID=req.params.shortId;
    const entry=await url.findOneAndUpdate({shortID},{
        $push:{
            visitedHistory:{
                timestamp:Date.now(),
            },
        },
    });
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectUrl);
})
app.listen(Port,()=>console.log(`Server Started at port${Port}`));
