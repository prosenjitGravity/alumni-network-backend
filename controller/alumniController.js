const Alumni = require("../model/alumniModels");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const getAlumni=async (req,res)=>{
  try{
    const alumni=await Alumni.find();
    res.status(200).json({status:1,msg:alumni})
  }catch(error){
    console.log("getAlumni error"+error);
    res.status(400).json({status:0,msg:error});
  }
}
const getWithToken=async(req,res)=>{
  const token = req.headers.authorization ||req.query.token;
  console.log("token : ",token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    const userId = decoded;
    console.log('user_id : ',userId.id)
    Alumni.findById(userId.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({status :0, error: 'User not found' });
      }

      // Return the user data in the response
      res.json({status:1,msg:user});
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    });
});
}

const registerAlumni = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    course_type,
    department,
    admission_year,
    course_complete_year,
    job_title,
    company,
    password,
  } = req.body;
  if (!first_name || !last_name || !email || !password) {
    res.status(404).json({ msg: "please entre the required fields" });
    return;
  }
  const alumniExists = await Alumni.findOne({ email });
  if (alumniExists) {
    res.status(404).json({ msg: "you are already registered" });
    return;
  }
  try {
    const alumni = await Alumni.create(req.body);
    res.status(201).json(alumni);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
};
const loginAlumni = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status()
      .json({ status: 0, msg: "please enter a valid email and password",email });
    return;
  }
  const alumniExists = await Alumni.findOne({ email });
  if (!alumniExists) {
    res
      .status(404)
      .json({
        status: 0,
        msg: "you are not registered alumni. please Register.",
      });
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
  // console.log(" the res.cookie is  : " + res.cookie);
  res.status(200).json({ alumni: alumniExists, token });
};

const updateAlumni = async (req, res) => {
  try {
    let alumni = await Alumni.findByIdAndUpdate(req.param.id, req.body);
    console.log("the alumni is" + alumni);
    res.status(200).json({ status: 1, msg: alumni });
  } catch (error) {
    res.status(400).json({ status: 0, msg: error });
  }
};
const logOutAlumni = (req, res) => {
  console.log("logout called....");
  try {
    res.cookie("token", null, {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    // console.log("the alumni cookie is : "+res.cookie)
    res.status(200).json({ msg: "logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};
const alumniProfile = (req, res) => {
  console.log("the alumniProfile is called");
  // console.log(req.alumni)
  res.status(200).json(req.alumni);
};
const alumniImage = (req, res) => {
    // console.log(req);
    // console.log(req.file.fileName);
  try {
    console.log("the image file is  : ",req.file);
    let imgInfo;
      imgInfo = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
      };
    res.status(200).json({status:1,msg:"image info is"+imgInfo});
  } catch (error) {
    console.log('the error is :  '+error);
    res.status(404).json({status:0, msg: "Please provide a valid file." });
  }
};

module.exports = {
  getAlumni,
  registerAlumni,
  loginAlumni,
  updateAlumni,
  logOutAlumni,
  alumniProfile,
  alumniImage,
  getWithToken
};
