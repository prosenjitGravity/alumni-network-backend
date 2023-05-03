const Alumni =require("../model/alumniModels");
const jwt = require("jsonwebtoken");

const generateToken= (id)=>{
    return jwt.sign({ id },"SecretEncryption",{
        expiresIn:"id",
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
        res.status.json({status:0,msg:"please enter a valid email and password"});
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
      secure: true,
    });
    res.status.json({ alumni: alumniExists, token });
};
const logOutAlumni = (req, res) => {
    res.send("Logout");
    req.logout()
  };
  
  module.exports = { registerAlumni, loginAlumni, logOutAlumni };
  