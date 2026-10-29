require('dotenv').config();
const express=require('express'),mongoose=require('mongoose'),cors=require('cors'),helmet=require('helmet');
const {errorHandler}=require('./middleware/errors');
const app=express();
app.use(helmet());
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'}));
app.use(express.json());
app.use('/api/users',require('./routes/users'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/contact',require('./routes/contact'));
app.use('/api/blog',require('./routes/blog'));
app.use(errorHandler);
if(!process.env.MONGODB_URI||!process.env.JWT_SECRET){console.error('MONGODB_URI and JWT_SECRET are required');process.exit(1)}
mongoose.connect(process.env.MONGODB_URI,process.env.MONGODB_PROXY_HOST?{proxyHost:process.env.MONGODB_PROXY_HOST,proxyPort:Number(process.env.MONGODB_PROXY_PORT||1080)}:{}).then(()=>app.listen(process.env.PORT||5000,()=>console.log('API ready'))).catch(e=>{console.error(e);process.exit(1)});
