const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const alumniTable=mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'please provide the first name'],
        trim:true,
    },
    last_name:{
        type:String,
        required:[true,'please provide the last name'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'please provide the email address'],
        trim:true,
        unique:true
     },
     phone:{
        type:String,
        required:[true,'please provide the phone number'],
        trim:true,
        unique:true
     },
     role:{
        type:String,
        required:[true,'please provides the user role'],
        enum:['student','alumni'],
        default:''
     },
     course_type:{
        type:String,
        trim:true
    },
    department:{
        type:String,
        trim:true
    },
    admission_year:{
        type:Number,

        trim:true
    },
    course_end_year:{
        type:Number,
        trim:true
    },
    job_title:{
        type:String,
        trim:true
    },
    company:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true,
    },
    cover_image:{
        type:String ,
        default:"https://klaxos.com/wp-content/uploads/2017/12/strategy-brain-think-Mastermind.jpg"
    },
    profile_image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    password:{
        type:String,
        required:[true,'please provide the password'],
        trim:true,
        unique:true
    },
    about_me:{
        type:String,
        default:''
    },
    links:[
        {
            type:String,
            default:'linkedin'
        },
        {
            type:String,
            default:'github'
        },
        {
            type:String,
            default:'youtube'
        },
        {
            type:String,
            default:'website'
        },
        {
            type:String,
            default:'leetcode'
        },
        {
            type:String,
            default:'hackerrank'
        },
        {
            type:String,
            default:'codeforces'
        },
    ]
});
alumniTable.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    //password Hassing
    const salt=await bcrypt.genSalt(13);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
const Alumni=mongoose.model('Alumni',alumniTable);
module.exports=Alumni;






