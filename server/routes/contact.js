const router=require('express').Router();
const c=require('../controllers/contact');

router.post('/',c.post_root);
module.exports=router;
