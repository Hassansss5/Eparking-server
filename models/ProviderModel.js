const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const bcrypt = require('bcrypt')

const ProviderSchema = new mongoose.Schema({
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
    free: {
        type: Number,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    image:{
        type:String,
    },
    password: {
        type: String,
        require: true
    },
    coordinate:{
            type: {Number},
            index: '2dsphere'
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point']
    //     },
    //     coordinates: {
    //         type: [Number],
    //         index: '2dsphere'
    //     },
    //     formattedAddress: String
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProviderSchema.pre('save', function (next) {
    const mark = this;
    if (!mark.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(mark.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            mark.password = hash;
            next()
        })
    })
})

ProviderSchema.methods.comparePassword = function (candidatePassword) {
    const mark = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, mark.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(false)
            }
            resolve(true)
        })
    })

}
// Geocode & create location
ProviderSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.coordinate = {
        longitude:loc[0].longitude, 
        latitude:loc[0].latitude,
    }  
        // type: 'Point',
        // formattedAddress: loc[0].formattedAddress

    // Do not save address
    next();
});

module.exports = mongoose.model('ProviderModel', ProviderSchema)
// mongoose.model('ProviderModel', ProviderSchema);;