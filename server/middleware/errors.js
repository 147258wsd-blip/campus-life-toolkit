const wrap=f=>(req,res,next)=>Promise.resolve(f(req,res,next)).catch(next);
const fail=(status,message)=>{const e=new Error(message);e.status=status;throw e};
const errorHandler=(err,req,res,next)=>{res.status(err.status||(/CastError|ValidationError/.test(err.name)?400:err.code===11000?409:500)).json({error:err.status||err.name==='ValidationError'||err.name==='CastError'||err.code===11000?err.message:'Server error'})};
module.exports={wrap,fail,errorHandler};
