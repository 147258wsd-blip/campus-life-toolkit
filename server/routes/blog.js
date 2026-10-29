const router=require('express').Router();
const c=require('../controllers/blog');
const protect=require('../middleware/auth');

router.get('/',c.get_root);
router.get('/:id',c.get_id);
router.post('/',protect,c.post_root);
router.put('/:id',protect,c.put_id);
router.delete('/:id',protect,c.delete_id);
router.get('/:postId/comments',c.get_postId_comments);
router.post('/:postId/comments',protect,c.post_postId_comments);
module.exports=router;
