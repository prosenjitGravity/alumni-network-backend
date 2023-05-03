const express = require("express");
const {
  registerStudent,
  loginStudent,
  logOutStudent,
} = require("../controller/studentController");
const router = express.Router();
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/logout", logOutStudent);

module.exports = router;
