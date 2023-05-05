const express = require("express");
const registeredStudent =require('../middlewares/studentAuthMiddleware');
const {
  registerStudent,
  loginStudent,
  logOutStudent,
  studentProfile,
} = require("../controller/studentController");

const router = express.Router();
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logOutStudent);
router.get("/profile",registeredStudent,studentProfile);

module.exports = router;
