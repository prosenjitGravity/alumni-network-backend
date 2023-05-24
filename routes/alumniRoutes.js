const express = require("express");
const {
  getAlumni,
  registerAlumni,
  loginAlumni,
  logOutAlumni,
  alumniProfile,
  updateAlumni,
  alumniImage,
  getWithToken
} = require("../controller/alumniController");
const registeredAlumni = require("../middlewares/alumniAuthMiddleware");
const {upload}=require("../utils/fileUpload");

const router = express.Router();
router.get("/",getAlumni);
router.get("/my-profile",getWithToken);
router.post("/register", registerAlumni);
router.post("/login", loginAlumni);
router.put("/:id",updateAlumni);
router.post("/logout", logOutAlumni);
router.get('/profile',registeredAlumni,alumniProfile)
router.post("/upload", upload.single("image"), alumniImage);


module.exports = router;