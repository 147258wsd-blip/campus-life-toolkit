const {BlogPost,Comment}=require('../models');
const {wrap,fail}=require('../middleware/errors');
exports.get_root=wrap(async(req,res)=>res.json(await BlogPost.find().populate('author','username').sort({createdAt:-1})));
exports.get_id=wrap(async(req,res)=>{const post=await BlogPost.findById(req.params.id).populate('author','username');if(!post)fail(404,'Post not found');res.json({...post.toObject(),comments:await Comment.find({post:post.id}).populate('author','username').sort({createdAt:-1})})});
exports.post_root=wrap(async(req,res)=>res.status(201).json(await BlogPost.create({...req.body,author:req.user.id})));
exports.put_id=wrap(async(req,res)=>{const post=await BlogPost.findById(req.params.id);if(!post)fail(404,'Post not found');if(String(post.author)!==req.user.id)fail(403,'Not authorized');post.title=req.body.title;post.content=req.body.content;res.json(await post.save())});
exports.delete_id=wrap(async(req,res)=>{const post=await BlogPost.findById(req.params.id);if(!post)fail(404,'Post not found');if(String(post.author)!==req.user.id)fail(403,'Not authorized');await Comment.deleteMany({post:post.id});await post.deleteOne();res.json({message:'Deleted'})});
exports.get_postId_comments=wrap(async(req,res)=>res.json(await Comment.find({post:req.params.postId}).populate('author','username')));
exports.post_postId_comments=wrap(async(req,res)=>{if(!await BlogPost.exists({_id:req.params.postId}))fail(404,'Post not found');res.status(201).json(await Comment.create({body:req.body.body,author:req.user.id,post:req.params.postId}))});
