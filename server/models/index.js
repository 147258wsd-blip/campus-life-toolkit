const mongoose=require('mongoose');
const S=mongoose.Schema;
const User=mongoose.model('User',new S({username:{type:String,required:true,unique:true},email:{type:String,required:true,unique:true},password:{type:String,required:true,minlength:6},isAdmin:{type:Boolean,default:false}}));
const Project=mongoose.model('Project',new S({title:{type:String,required:true},description:{type:String,required:true},imageUrl:String,repoUrl:String,liveUrl:String,user:{type:S.Types.ObjectId,ref:'User',required:true}}));
const BlogPost=mongoose.model('BlogPost',new S({title:{type:String,required:true},content:{type:String,required:true},author:{type:S.Types.ObjectId,ref:'User',required:true}},{timestamps:true}));
const Comment=mongoose.model('Comment',new S({body:{type:String,required:true},author:{type:S.Types.ObjectId,ref:'User',required:true},post:{type:S.Types.ObjectId,ref:'BlogPost',required:true}},{timestamps:true}));
const Message=mongoose.model('Message',new S({name:{type:String,required:true},email:{type:String,required:true},message:{type:String,required:true}},{timestamps:true}));
module.exports={User,Project,BlogPost,Comment,Message};
