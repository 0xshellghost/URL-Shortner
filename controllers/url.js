const shortid=require('shortid');
const url=require('../models/url')
async function handleGenerateNewShortURL(req,res){
    console.log("Incoming request body:", req.body);
    const shortID=shortid();
    const body=req.body;
    if(!body.url){
        return res.status(400).json({err:"URL is Required"});
    }
    let targetUrl = body.url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'http://' + targetUrl;
    }
    await url.create({
        shortID: shortID,      
        redirectUrl: targetUrl, 
        visitHistory: [],
        createdBy:req.user._id
    });
    return res.redirect('/?id=' + shortID);
}
async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const entry=await url.findOne({shortID});
    return res.status(200).json({totalclicks:entry.visitHistory.length,analytics:entry.visitHistory});
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
};