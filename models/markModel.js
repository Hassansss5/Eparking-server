const mongoose = require('mongoose');


const providerMarkSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phoneNo: {
        type: String,
        unique: true,
        require: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    parkingName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    spots: {
        type: Number,
        require: true
    },
    description: {
        type: String,
    },
    free: {
        type: Number,
        require: true
    },
    coordinate: {
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
    },
    // longitude: {
    //     type: Number,
    // },
    // latitude: {
    //     type: Number,
    // },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('MarkModel', providerMarkSchema);