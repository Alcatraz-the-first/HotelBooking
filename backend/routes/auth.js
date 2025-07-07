const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JWT = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());

router.post('/signup' , async (req,res) => {
    try{
        const {email , password } = req.body;
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
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        if(!(await user.comparePassword(password))){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET, {expiresIn : '1min'});
        res.cookie('token' , token ,{
            httpOnly: true ,
            secure:true ,
            sameSite: 'strict'
        });
        res.status(200).json({message : "Login successful"}); ;
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;