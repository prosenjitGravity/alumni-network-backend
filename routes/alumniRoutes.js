const express = require("express");
const {
  registerAlumni,
  loginAlumni,
  logOutAlumni,
  alumniProfile,
} = require("../controller/alumniController");
const registeredAlumni = require("../middlewares/alumniAuthMiddleware");

const router = express.Router();
router.post("/register", registerAlumni);
router.post("/login", loginAlumni);
router.post("/logout", logOutAlumni);
router.get('/profile',registeredAlumni,alumniProfile)

module.exports = router;
