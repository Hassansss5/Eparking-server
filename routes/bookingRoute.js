const express = require('express');
const mongoose = require('mongoose');
const booking = mongoose.model('booking');
const User = mongoose.model('UserModel');
const router = express.Router();


// router.post('/user/booking', async (req , res)=>{
//         try {
//         const book = await booking.create(req.body);
//         return res.status(201).json({
//           success: true,
//           data: book
//         });
//       } catch (err) {
//         console.error(err);
//         // if (err.code === 11000) {
//         //   return res.status(400).json({ error: 'This already exists' });
//         // }
//         res.status(500).json({ error: 'Server error' });
//       }
// })

// user booking parking 
router.post("/user/booking/:userId", async (req, res) => {
  //Find a POst
  const user = await User.findOne({ _id: req.params.userId });

  //Create a Comment
  const book = new booking();
  book.parkingName = req.body.parkingName;
  book.totalHours = req.body.totalHours;
  book.carNo = req.body.carNo;
  book.user = user._id;
  await book.save();

  // Associate Post with comment
  user.booking.push(book._id);
  await user.save();

  res.send(book);
});

// user fetching details
router.get('/user/booking/details/:id', async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.params.id });
  
      return res.status(200).json({
        success: true,
        count: user.length,
        data: user.booking
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;