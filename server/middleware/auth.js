const jwt=require('jsonwebtoken');
const {User}=require('../models');
const {wrap,fail}=require('./errors');
module.exports=wrap(async(req,res,next)=>{const token=req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];if(!token)fail(401,'Authentication required');let decoded;try{decoded=jwt.verify(token,process.env.JWT_SECRET)}catch{fail(401,'Invalid token')}req.user=await User.findById(decoded.id).select('-password');if(!req.user)fail(401,'User not found');next()});
