const express=require('express');
const router=express.Router();
const{createPost,getPost,updatePost,deletePost}=require('../controller/postController');

router.get('/',getPost);
router.post('/create',createPost);
router.put('/:id',updatePost);
router.delete("/:id",deletePost);
module.exports=router