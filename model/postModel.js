const mongoose=require('mongoose');
const{ObjectId}=mongoose.Schema.Types
const postTable= mongoose.Schema({ 
    userImage:{
        type:String,
        default:''
    },
    first_name:{
        type:String, 
        required:[true,'please provide the userName'],
        trim:true
    },
    last_name:{
        type:String,
        required:[true,'please provide the userName'],
        trim:true
    },
    postDate:{
        type:Date,
        default:''
    },
    description:{
        type:String,
        required:[true, "please provide the post description"],
    },
    postImage:{
        data:String,                                                                                                                

    },
    userId: {
        type:String,
        required:[true,"please provide the user id"]

    },
    user_role:{
        type:String,
        required:[true,'please provide ther user role']
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Alumni"
    }
});
const Post =mongoose.model("post",postTable);
module.exports=Post;