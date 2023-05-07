const jwt = require("jsonwebtoken");
const Alumni = require("../model/alumniModels");

const registeredAlumni = async (req, res, next) => {
  try {
    console.log(req.cookie);
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(200).json({ status: 0, msg: "alumni not logged in " });
    }



    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    const alumni = await Alumni.findById(verified.id);
    console.log(alumni);
    if (!alumni && alumni==undefined) {
      res.status(200).json({ status: 0, msg: "alumni not logged in " });
      return;
    }
    req.alumni = alumni;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: "alumni not logged in " });
    console.error(error);
  }
};
module.exports = registeredAlumni;
