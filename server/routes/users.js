const router=require('express').Router();
const c=require('../controllers/users');
const protect=require('../middleware/auth');

router.post('/register',c.post_register);
router.post('/login',c.post_login);
module.exports=router;
