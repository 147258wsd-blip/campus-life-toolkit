const {Message}=require('../models');
const {wrap,fail}=require('../middleware/errors');
exports.post_root=wrap(async(req,res)=>res.status(201).json(await Message.create(req.body)));
