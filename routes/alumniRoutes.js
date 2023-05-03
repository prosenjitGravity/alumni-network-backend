const express = require("express");
const {
  registerAlumni,
  loginAlumni,
  logOutAlumni,
} = require("../controller/alumniController");

const router = express.Router();
router.post("/register", registerAlumni);
router.post("/login", loginAlumni);
router.post("/logout", logOutAlumni);
module.exports = router;
