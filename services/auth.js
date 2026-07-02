const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "fallback_secret_for_local_dev";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
    }, secret);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}