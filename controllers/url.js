const shortid=require('shortid');
const url=require('../models/url')
async function handleGenerateNewShortURL(req,res){
    console.log("Incoming request body:", req.body);
    const shortID=shortid();
    const body=req.body;
    if(!body.url){
        return res.status(400).json({err:"URL is Required"});
    }
    await url.create({
        shortID: shortID,      
        redirectUrl: body.url, 
        visitedHistory: [],
    });
    return res.status(200).json({id:shortID});
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await url.findOne({shortID});
    return res.status(200).json({totalclicks:entry.visitedHistory.length,analytics:entry.visitedHistory});
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};