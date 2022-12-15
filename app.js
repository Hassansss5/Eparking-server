const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const port = 2020;
const { mogoUrl } = require('./keys');

require('./models/UserModel');
require('./models/ProviderModel');
require('./models/booking');
require('./models/markModel');


const authRoutes = require('./routes/authroute');
const providerRoutes = require('./routes/providerRoutes');
const bookingRiute = require('./routes/bookingRoute');
const addImage = require('./routes/addImage');
const verifyToken = require('./middlewares/verifyToken');
const verifyTokenProvider = require('./middlewares/providerVerifyToken')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authRoutes);
app.use(providerRoutes);
app.use(bookingRiute);
app.use(addImage);



mongoose.connect(mogoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Database......!');
})
mongoose.connection.on('error', (err) => {
    console.log('This is Error....!', err);
})

// token verification user data in array form
app.get('/user', verifyToken, (req, res) => {
    // res.send({
    //     User: req.user
    // })
    // console.log(req.user);
    res.send({
        data: [
            {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                phoneNo: req.user.phoneNo,
                email: req.user.email,
                image: req.user.image,
                password: req.user.password,
            }
        ]
    })
})
// token verification user data in obj form
app.get('/user/rec/fetch', verifyToken, (req, res) => {
    // res.send({
    //     User: req.user
    // })
    // console.log(req.user);
    res.send({
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phoneNo: req.user.phoneNo,
        email: req.user.email,
        image: req.user.image,
        password: req.user.password,
    })
})

// token verification provider data in array form
app.get('/provider', verifyTokenProvider, (req, res) => {
    // res.send({
    //     User: req.user
    // })
    // console.log(req.user);
    res.send({
        data: [
            {
                id: req.mark._id,
                fullName:req.mark.fullName,
                email:req.mark.email,
                phoneNo:req.mark.phoneNo,
                address:req.mark.address,
                parkingName:req.mark.parkingName,
                price:req.mark.price,
                spots:req.mark.spots,
                free:req.mark.free,
                image: req.mark.image,
                description:req.mark.description,
            }
        ]
    })
})

// token verification provider data in obj form
app.get('/provider/rec/fetch', verifyTokenProvider, (req, res) => {
    // res.send({
    //     User: req.user
    // })
    // console.log(req.user);
    res.send({
        id: req.mark._id,
        fullName:req.mark.fullName,
        email:req.mark.email,
        phoneNo:req.mark.phoneNo,
        address:req.mark.address,
        parkingName:req.mark.parkingName,
        price:req.mark.price,
        spots:req.mark.spots,
        free:req.mark.free,
        image: req.mark.image,
        description:req.mark.description,
    })
})


app.listen(port, () => {
    console.log('Server has been started on Port ' + port + '...!');
})