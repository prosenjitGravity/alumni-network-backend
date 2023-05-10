const jwt = require("jsonwebtoken");
const Alumni = require("../model/alumniModels");

const registeredAlumni = async (req, res, next) => {
  try {
    console.log("the auth req.cookie is : ",req.cookies);
    const token = req.cookies?.token;
    console.log("the auth token is ", token);
    if (!token || typeof token== undefined) {
      res.status(200).json({ status: 0, msg: "alumni not logged in " });
      return;
    }
    console.log(" toke is ..."+ typeof token)



    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('the verified is  : '+verified);
    const alumni = await Alumni.findById(verified.id);
    console.log('the alumni is : '+alumni);
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
