const {getUser}=require('../services/auth');
async function restrictToLoggedinUserOnly(req,res,next){
    let token = req.cookies?.uid;
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    const user = getUser(token);
    if(!user) return res.redirect('/login');
    req.user=user;
    next();
}
async function checkAuth(req,res,next){
    let token = req.cookies?.uid;
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    const user = getUser(token);
    req.user=user;
    next();
}
module.exports= {
    restrictToLoggedinUserOnly,
    checkAuth
}