const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {setUser}=require('../services/auth');
const {getUser}=require('../services/auth');
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect('/');
}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.render('login',{
            error:"Invalid Username"
        });
    }
    if(user.password!==password){
        return res.render('login',{
            error:"Invalid Password"
        });
    }
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect('/');
}
module.exports={
    handleUserSignup,
    handleUserLogin,
}