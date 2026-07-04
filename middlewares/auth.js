const {getUser}=require('../services/auth');
function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie){
        return next();
    }
    const user=getUser(tokenCookie);
    req.user=user;
    next();
}
function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.end('Unauthorized');
        next();
    }
}
module.exports= {
    checkForAuthentication,
    restrictTo,
}