const jwt = require("jsonwebtoken");
const Student = require("../model/studentModels");

const registeredStudent = async (req, res, next) => {
  try {
    console.log(req.cookie);
    const token = req.cookies.token;
    console.log( 'the token is  : '+token);
    if (!token) {
      res.status(200).json({ status: 0, msg: "student not logged in" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("the verified is  : "+verified);
    const student = await Student.findById(verified.id);
    console.log('student are :'+student);
    if (!student) {
      res.status(200).json({ status: 0, msg: "student not logged in" });
      return;
    }
    req.student = student;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: "student not logged in " });
  }
};
module.exports = registeredStudent;
