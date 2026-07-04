const express=require('express');
const router=express.Router();
const url = require('../models/url');
const {restrictTo} = require('../middlewares/auth');
router.get('/admin/urls',restrictTo(["ADMIN"]), async (req,res)=>{
    const allurls = await url.find({});
    return res.render("home", {
        urls: allurls,
        user: req.user,
    });
})  
router.get('/', async (req,res)=>{
    if(!req.user) {
        return res.render("home", {
            urls: [],
        });
    }
    const allurls = await url.find({createdBy:req.user._id});
    return res.render("home", {
        urls: allurls,
        user: req.user,
        id: req.query.id,
    });
})
router.get('/signup',(req,res)=>{
    return res.render("signup");
})
router.get('/login',(req,res)=>{
    const user=req.user;
    return res.render("login",{
        user,
    });
})
module.exports=router;