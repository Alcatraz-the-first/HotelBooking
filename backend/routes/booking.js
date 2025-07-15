const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const userBooking = require('../models/UserBookings');

router.get('/' , authenticateToken , async (req,res,next) => {
    try{
        const userId = req.userId ;
        if(!userId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bookings = await userBooking.find({userId : userId});
        if(!bookings || bookings.length === 0){
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json(bookings);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/rooms', authenticateToken , async (req , res, next) => {
    try{
        const { hotelId, numberOfRooms, ratePerNight, totalPrice, checkInDate, checkOutDate } = req.body;
        const userId = req.userId;
        if(!hotelId || !numberOfRooms || !ratePerNight || !totalPrice || !checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBooking = new userBooking({
            userId,
            hotelId,
            numberOfRooms,
            ratePerNight,
            totalPrice,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate)
        });
        await newBooking.save();
        res.status(201).json({ message: "Booking successful"});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router ;