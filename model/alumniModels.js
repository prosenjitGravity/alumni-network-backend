const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const alumniTable=mongoose.Schema({
    first_name:{
        type:String,
        require:[true,'please provide the first name'],
        trim:true,
    },
    last_name:{
        type:String,
        require:[true,'please provide the last name'],
        trim:true
    },
    email:{
        type:String,
        require:[true,'please provide the email address'],
        trim:true,
        unique:true
     },
     phone:{
        type:String,
        require:[true,'please provide the phone number'],
        trim:true,
        unique:true
     },
     course_type:{
        type:String,
        require:[true,'please provide the course type UG or PG'],
        trim:true
    },
    department:{
        type:String,
        require:[true,'please provide the course department'],
        trim:true
    },
    admission_year:{
        type:Number,
        require:[true,'please provide the admission year'],
        trim:true
    },
    course_end_year:{
        type:Number,
        require:[true,'please provide the admission year'],
        trim:true
    },
    job_title:{
        type:String,
        require:[true,'please provide the job title'],
        trim:true
    },
    company:{
        type:String,
        require:[true,'please provide the companey name'],
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
        require:[true,'please provide the password'],
        trim:true,
        unique:true
    }
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