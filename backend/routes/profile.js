const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const User = require('../models/User');
require('dotenv').config();

router.get('/' , authenticateToken, async (req, res ,next) => {
    try{
        const userId = req.userId;
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(userId) ; // Exclude password from response
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/update', authenticateToken, async (req, res ,next) => {
    try{
        const userId = req.userId ;
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const {firstname , lastname} = req.body ;
        const updateUser = {} ;
        if(firstname) updateUser.firstname = firstname.trim() ;
        if(lastname) updateUser.lastname = lastname.trim() ;

        const user = await User.findByIdAndUpdate(
            userId ,
            {$set: updateUser},
            {new: true, runValidators: true}
        )
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router ;