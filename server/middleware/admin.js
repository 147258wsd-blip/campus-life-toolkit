const {fail}=require('./errors');
module.exports=(req,res,next)=>{if(!req.user?.isAdmin) return next(Object.assign(new Error('Admin access required'),{status:403}));next()};
