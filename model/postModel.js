const mongoose=require('mongoose');
const postTable= mongoose.Schema({ 
    userImage:{
        type:String,
        default:''
    },
        name:{
        type:String,
        required:[true,'please provide the userName'],
        trim:true
    },
    postDate:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        required:[true, "please provide the post description"],
    },
    postImage:{
        data:String,                                                                                                                

    },
    // userId: {
    //     type: mongoose.Mongoose
    // }
});
const Post =mongoose.model("post",postTable);
module.exports=Post;