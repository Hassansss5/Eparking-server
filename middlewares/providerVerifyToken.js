const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ProviderSchema = mongoose.model('ProviderModel');
const {jwtkey} = require('../keys');

module.exports = (req,res,next)=>{
       const { authorization } = req.headers;
       //authorization === Bearer sfafsafa
       if(!authorization){
           return res.status(401).send({error:"you must be logged in"})
       }
       const token = authorization.replace("Bearer ", "");
       jwt.verify(token,"NaeBtaonGa",async (err,payload)=>{
           if(err){
             return  res.status(401).send({error:"you must be logged in 2"})
           }
        const {providerId} = payload;
        const mark = await ProviderSchema.findById(providerId)
        req.mark=mark;
        console.log(req.mark);
        next();
       })
}