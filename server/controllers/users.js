const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {User}=require('../models');
const {wrap,fail}=require('../middleware/errors');
exports.post_register=wrap(async(req,res)=>{const {username,email,password}=req.body;if(!username||!email||!password||password.length<6)fail(400,'Valid username, email and password (6+ characters) required');const user=await User.create({username,email,password:await bcrypt.hash(password,12)});res.status(201).json({id:user.id,username:user.username,email:user.email})});
exports.post_login=wrap(async(req,res)=>{const user=await User.findOne({email:req.body.email});if(!user||!await bcrypt.compare(req.body.password||'',user.password))fail(401,'Invalid credentials');res.json({token:jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'}),user:{id:user.id,username:user.username,email:user.email,isAdmin:user.isAdmin}})});
