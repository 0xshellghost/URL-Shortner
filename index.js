require('dotenv').config();
const express=require('express');
const urlRoute=require('./routes/url');
const path=require('path');
const staticRouter=require('./routes/staticRouter');
const connectToMongoDb=require('./connect');
const url=require('./models/url');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',staticRouter);
app.use('/url',urlRoute);

const Port=8001;
const MONGO_URI=process.env.MONGODB_URI;
connectToMongoDb(MONGO_URI);
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));
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
    let redirectUrl = entry.redirectUrl;
    if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = 'http://' + redirectUrl;
    }
    res.redirect(redirectUrl);
})
app.listen(Port,()=>console.log(`Server Started at port:${Port}`));
