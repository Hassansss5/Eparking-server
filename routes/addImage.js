const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('UserModel');
// const booking = mongoose.model('booking');
const ProviderSchema = mongoose.model('ProviderModel');

// user image 
router.post('/user/image/:id',(req , res)=>{
    var id = req.params.id
    User.findByIdAndUpdate(id,{
        image: req.body.image
    })   
    //product.save()
    .then(data=>{
        console.log(data)
        res.send("data updated")
    }).catch(err=>{
        console.log(err)
    })
})

// provider image 
router.post('/provider/image/:id',(req , res)=>{
    var id = req.params.id
    ProviderSchema.findByIdAndUpdate(id,{
        image: req.body.image
    })   
    //product.save()
    .then(data=>{
        console.log(data)
        res.send("data updated")
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;