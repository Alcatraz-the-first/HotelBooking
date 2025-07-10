const JWT = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

async function authenticateToken(req,res,next){
    try{
        const token = req.cookies.token ;
        if(token === '' || token === undefined || token === null){
            console.log("No token found in cookies");
            return res.status(401).json({ message: "No Token !" });
        }
        const userId = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId.id);
        if(!user || !userId){
            res.clearCookie('token'); // Clear the cookie if verification fails
            console.log("User not found or token verification failed");
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = user._id ;
        next() ;
    }catch(err){
        console.error(err);
        console.log("Token verification failed");
        return res.status(500).json({ message: "Verification failed" });
    }
}

module.exports = authenticateToken ;