const User=require('../model/userModels');
const getUser=async (req,res)=>{
    try{
        const user=await User.find();
        res.status(200).json({status:1, msg:'user'})
    }catch(error){
        console.log('Something went wrong : '+error);
        res.status(400).json({status:0, msg:'user'})
    }
};
const addUser=async (req,res)=>{
    try{
        const user=await User.create(req.body);
        res.status(200).json({status:1, msg:'user'});
    }catch(error){
        console.log('Something went wrong : '+error);
        res.status(400).json({status:0,msg:'user'});
    }
}
const updateUser=async (req,res)=>{
    try{
        let user = await User.findByIdAndUpdate(req.param.id,req.body);
        res.status(200).json({status:1,msg:'user'});
    }catch(error){
        res.status(400).json({status:0,msg:'error'})
    }
}

const deleteUser=async (req,res )=>{
    try{
        let user=await User.findByIdAndDelete(req.param.id);
        res.status(200).json({status:1,msg:'user'});
    }catch(error){
        res.status(400).json({status:0,msg:'error'})
    }
}


module.exports={getUser,addUser,updateUser,deleteUser};