const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phoneNo: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    image:{
        type:String,
    },
    password: {
        type: String,
        require: true
    },
    booking: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'booking',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })
    })
})

User.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
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


mongoose.model('UserModel', User);