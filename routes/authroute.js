const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const router = express.Router();
var bcrypt = require('bcrypt');
const User = mongoose.model('UserModel');
// const booking = mongoose.model('booking');
// const ProviderSchema = mongoose.model('ProviderModel');
const { jwtkey } = require('../keys');

// user signup
router.post('/user/signup', async (req, res) => {
    console.log(req.body);
    const {
        firstName,
        lastName,
        phoneNo,
        email,
        image,
        password
    } = req.body;

    const user = new User({
        firstName,
        lastName,
        phoneNo,
        email,
        image,
        password,
    });
    try {
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtkey);
        res.send({ token });
    } catch (err) {
        res.status(422).json({
            message : 'Error'
        });
    }
});


// user signin
router.post('/user/signin', async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    if (!email || !password) {
        return res.status(422).json({ error: "must provide email or password" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(422).json({ error: "must provide email or password" })

    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.send({ token })
    } catch (err) {
        return res.status(422).json({ error: "must provide email or password" })
    }

})

// user update
router.post('/user/update/:id',(req , res)=>{
  var id = req.params.id
  User.findByIdAndUpdate(id,{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    phoneNo:req.body.phoneNo,
    email:req.body.email,
    password:req.body.password,
  })   
  //product.save()
  .then(()=>{
    //   console.log(data)
      res.send("data updated")
  }).catch(err=>{
      console.log(err)
  })
})

module.exports = router;