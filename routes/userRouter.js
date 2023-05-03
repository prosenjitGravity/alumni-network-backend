const express= require('express');
const router=express.Router();
const {addUser,getUser,updateUser,deleteUser}=require('../controller/userController');


router.get('/',getUser);
router.post('/add',addUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

module.exports=router;