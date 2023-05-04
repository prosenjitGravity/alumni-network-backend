const mongoose= require('mongoose');
const postTable= mongoose.Schema({
    
    userImage:{
        type:String,
        default:''
    },
        userName:{
        type:String,
        require:[true,'please provide the userName'],
        trim:true
    },
    postDate:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String,
        require:[true, "please provide the post description"],
    },
    postImage:{
        data:Buffer,

    }
});
const Post =mongoose.model("post",postTable);
module.exports=Post;