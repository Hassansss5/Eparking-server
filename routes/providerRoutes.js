const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ProviderSchema = mongoose.model('ProviderModel');
// const providerMarkSchema = mongoose.model('MarkModel');
const jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
const { jwtkey } = require('../keys');
// const ProviderSchema = mongoose.model('ProviderModel');

// provider get details
// router.get('/provider/details', async (req, res) => {
//     try {
//         const Provider = await ProviderSchema.find();
    
//         return res.status(200).json({
//           success: true,
//           count: Provider.length,
//           data: Provider
//         });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//       }
// });

// provider post signup with details
// router.post('/provider/signup', async (req, res) => {
//     try {
//         const Provider = await ProviderSchema.create(req.body);
    
//         return res.status(201).json({
//           success: true,
//           data: Provider
//         });
//       } catch (err) {
//         console.error(err);
//         if (err.code === 11000) {
//           return res.status(400).json({ error: 'This already exists' });
//         }
//         res.status(500).json({ error: 'Server error' });
//       }
// });



// provider post signup with details marker on map
// router.post('/map/mark', async (req, res) => {
//     try {
//         const mark = await ProviderSchema.create(req.body);
    
//         return res.status(201).json({
//           success: true,
//           data: mark
//         });
//       } catch (err) {
//         console.error(err);
//         if (err.code === 11000) {
//           return res.status(400).json({ error: 'This already exists' });
//         }
//         res.status(500).json({ error: 'Server error' });
//       }
// });

router.post('/map/mark', async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    email,
    phoneNo,
    address,
    parkingName,
    price,
    spots,
    free,
    description,
    password
  } = req.body;

  const mark = new ProviderSchema({
    fullName,
    email,
    phoneNo,
    address,
    parkingName,
    price,
    spots,
    free,
    description,
    password
  });
  try {
      await mark.save();
      const token = jwt.sign({ providerId: mark._id }, jwtkey);
      res.send({ token });
  } catch (err) {
      res.status(422).json({
          message : 'Error'
      });
  }
});

router.post('/provider/signin', async (req, res) => {
  const { email, password } = req.body
  console.log(email)
  if (!email || !password) {
      return res.status(422).json({ error: "must provide email or password" })
  }
  const mark = await ProviderSchema.findOne({ email })
  if (!mark) {
      return res.status(422).json({ error: "must provide email or password" })

  }
  try {
      await mark.comparePassword(password);
      const token = jwt.sign({ providerId: mark._id }, jwtkey)
      res.send({ token })
  } catch (err) {
      return res.status(422).json({ error: "must provide email or password" })
  }

})

// provider Get signup with details marker on map
router.get('/map/mark', async (req, res) => {
    try {
        const mark = await ProviderSchema.find();
    
        return res.status(200).json({
          success: true,
          count: mark.length,
          data: mark
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
});

// provider update
router.post('/provider/update/:id',(req , res)=>{
  var id = req.params.id
  ProviderSchema.findByIdAndUpdate(id,{
    fullName:req.body.fullName,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    email:req.body.email,
    address:req.body.address,
    parkingName:req.body.parkingName,
    price:req.body.price,
    spots:req.body.spots,
    free:req.body.free,
    description:req.body.description,
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