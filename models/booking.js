const mongoose = require('mongoose');

const Booking = new mongoose.Schema({
    parkingName: {
        type: String,
    },
    totalHours: {
        type: String,
    },
    carNo: {
        type: String
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

mongoose.model('booking', Booking);