const {Project}=require('../models');
const {wrap,fail}=require('../middleware/errors');
exports.get_root=wrap(async(req,res)=>res.json(await Project.find().sort({_id:-1})));
exports.get_id=wrap(async(req,res)=>{const item=await Project.findById(req.params.id);if(!item)fail(404,'Project not found');res.json(item)});
exports.post_root=wrap(async(req,res)=>res.status(201).json(await Project.create({...req.body,user:req.user.id})));
exports.put_id=wrap(async(req,res)=>{const item=await Project.findById(req.params.id);if(!item)fail(404,'Project not found');if(String(item.user)!==req.user.id)fail(403,'Not authorized');Object.assign(item,req.body);res.json(await item.save())});
exports.delete_id=wrap(async(req,res)=>{const item=await Project.findById(req.params.id);if(!item)fail(404,'Project not found');if(String(item.user)!==req.user.id)fail(403,'Not authorized');await item.deleteOne();res.json({message:'Deleted'})});
