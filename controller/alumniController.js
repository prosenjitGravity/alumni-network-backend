const Alumni =require("../model/alumniModels");
const jwt = require("jsonwebtoken");

const generateToken= (id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:"1d",
    });
} 


const registerAlumni =async (req,res)=>{
    const {first_name,last_name,email,phone,course_type,department,admission_year,course_complete_year,job_title,company,password}=req.body;
    if(!first_name|| ! last_name || !email || !password){
        res.status(404).json({msg:"please entre the required fields"});
        return ;
    }
    const alumniExists = await Alumni.findOne({email});
    if(alumniExists){
        res.status(404).json({msg:"you are already registered"});
        return;
    }
    try{
        const alumni = await Alumni.create(req.body);
        res.status(201).json(alumni)
    }catch(error){
        console.log(error);
        res.status(400).json({});
    }
};
const loginAlumni= async (req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status().json({status:0,msg:"please enter a valid email and password"});
        return ;
    }
    const alumniExists =await Alumni.findOne({email});
    if(!alumniExists){
        res.status(404).json({status:0,msg:"you are not registered alumni. please Register."});
        return;
    }
    let token = generateToken(alumniExists._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expire: new Date(Date.now() + 1000 * 300), // 5 minutes
      sameSite: "none",
      secure: false,
    });
     console.log(" the res.cookie is  : "+res.cookie)
    res.status(200).json({ alumni: alumniExists, token });
};

const updateAlumni=async(req,res)=>{
    try{
        let alumni=await Alumni.findByIdAndUpdate(req.param.id,req.body);
        console.log('the alumni is'+alumni)
        res.status(200).json({status:1,msg:alumni})
    }catch(error){
        res.status(400).json({status:0,msg:error})
    }
}
const logOutAlumni = (req, res) => {
    console.log("logout called....");
    try{
        res.cookie('token',null,{
            path:'/',
            httpOnly:true,
            expires:new Date(0),
            sameSite:'none',
            secure:true,
        })
        // console.log("the alumni cookie is : "+res.cookie)
        res.status(200).json({msg:'logout successfully'});
    }
    catch(error){
        console.log(error);
        res.status(400).json({msg:error})
    }
  };
  const alumniProfile=(req,res)=>{
    console.log('the alumniProfile is called')
    // console.log(req.alumni)
    res.status(200).json(req.alumni);
  }  
  const alumniImage= (req,res)=>{
    try{
        let image_info;
        console.log(req.file)
        res.status(200).json({status:1,msg:'image upload success'})
    }catch(error){
        console.log(error)
        res.send(400).json({status:0,msg:error})
    }
  }

  module.exports = { registerAlumni, loginAlumni, updateAlumni, logOutAlumni, alumniProfile,alumniImage };
  