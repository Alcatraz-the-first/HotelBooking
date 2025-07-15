const mongoose = require('mongoose');
const { number } = require('zod');

const userBookingSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId ,
        required: true,
        ref: 'User' // Reference to User model - Study this for better understanding
    },
    hotelId : {
        type: String,
        required: true
    },
    numberOfRooms : {
        type: Number,
        required: true,
        default: 1
    },
    ratePerNight : {
        type: Number,
        required: true
    },
    totalPrice : {
        type: Number,
        required: true
    },
    checkInDate : {
        type: Date,
        required: true
    },
    checkOutDate : {
        type: Date,
        required: true
    },
    bookingDate : {
        type: Date,
        default: Date.now
    }
});

userBookingSchema.methods.toJSON = function(){
    const obj = this.toObject();
    return obj;
}

module.exports = mongoose.model('UserBooking', userBookingSchema);