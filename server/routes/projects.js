const router=require('express').Router();
const c=require('../controllers/projects');
const protect=require('../middleware/auth');
const admin=require('../middleware/admin');

router.get('/',c.get_root);
router.get('/:id',c.get_id);
router.post('/',protect,admin,c.post_root);
router.put('/:id',protect,admin,c.put_id);
router.delete('/:id',protect,admin,c.delete_id);
module.exports=router;
