const mongoose=require('mongoose');
const userTable=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide the valid user name'],
        trim:true,
    },
    phone:{
        type:String,
        required:[true,'please provide the valid phone number'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'please provide the valid email address'],
        trim:true,
        unique:true
    },
    degree:{
        type:String,
        required:[true,'please provide the degree UG or PG'],
    },
    course:{
        type :String,
        required:[true,'please provide the course name'],
        trim:true
    },
    branch:{
        type:String,
        required:[true, 'please provide the course branch name'],
    },
    admission_year:{
        type:String,
        required:[true,'please provide the admission year'],
    },
    photo:{
        type:String,
        default:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
    }
});

const user = mongoose.model('User',userTable);

module.exports=user;