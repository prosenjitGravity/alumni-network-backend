const Student = require("../model/studentModels");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "SecretEncrypted", {
    expiresIn: "id",
  });
};

const registerStudent = async (req, res) => {
  // console.log(req);
  const {
    first_name,
    last_name,
    email,
    phone,
    course_type,
    department,
    admission_year,
    password,
  } = req.body;
  console.log(
    first_name +" " +last_name +" " +email +" " +phone +" " +course_type +" " +department +" " +admission_year +" " +password);
  // console.log("the student is  : "+Student);
  if (!first_name || !last_name || !email || !phone) {
    res.status(404).json({ msg: "please enter  the required fields" });
    return;
  }
  const studentExists = await Student.findOne({email});
  if (studentExists) {
    res.status(404).json({ msg: "you are already registered. please login" });
    return;
  }
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error catch block" });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status.json({ status: 0, msg: "please enter valid email or pasword" });
    return;
  }
  const studentExists = await Student.findOne({ email });
  if (!studentExists) {
    res
      .status(404)
      .json({
        status: 0,
        msg: "you are not registered student. please Register.",
      });
    return;
  }
  let token = generateToken(studentExists._id);
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expire: new Date(Date.now() + 1000 * 300), // 5 minutes
    sameSite: "none",
    secure: true,
  });
  res.status.json({ student: studentExists, token });
};

const logOutStudent = (req, res) => {
  res.send("Logout");
  req.logout()
};

module.exports = { registerStudent, loginStudent, logOutStudent };
