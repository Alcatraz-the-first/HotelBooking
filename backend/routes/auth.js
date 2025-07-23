const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth');
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.post('/signup' , async (req,res) => {
    try{
        const {email , password } = req.body;
        console.log("Received signup request with email:", email);
        console.log("Received signup request with password:", password);
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({email}) ;
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            email : email ,
            password : password
        }) ;
        await newUser.save();
        //Creating JWT token and logging in autmoatically after signup
        const token = JWT.sign({id:newUser._id},process.env.JWT_SECRET, {expiresIn : '1h'});
        res.cookie('token' , token ,{
            httpOnly: true ,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
            path: '/' // or 'none' if using cross-origin requests
        });
        res.status(201).json({ message: "User created successfully"}) ;
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

router.post('/login', async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        const isProfileComplete = user.firstname && user.lastname;
        // var profile_check=false;
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        if(!(await user.comparePassword(password))){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // if((user.firstname!==""||user.firstname!==null||user.firstname!==undefined)&&(user.lastname!==""||user.lastname!==null||user.lastname!==undefined)) 
        //     {
        //         console.log("user found");
        //         profile_check=true;
        //     }
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET, {expiresIn : '1h'});
        res.cookie('token' , token ,{
            httpOnly: true ,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
            path: '/' // or 'none' if using cross-origin requests
        });
        // console.log(profile_check);
        res.status(200).json({message : "Login successful",profileComplete : isProfileComplete});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/logout' , authenticateToken , async (req,res,next) => {
    try{
        console.log('Inside logout route');
        res.clearCookie('token',{
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        res.status(200).json({ message: "Logout successful" });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
})

router.get('/check', authenticateToken , (req,res,next) => {  
    res.json({authenticated: true, userId: req.userId});
});

module.exports = router;