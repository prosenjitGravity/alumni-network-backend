const multer = require("multer");

const storage = multer.diskStorage({
  destination: __dirname+"/upload",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    console.log('uniqueSuffix '+uniqueSuffix)
    cb(null, uniqueSuffix+"_"+file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage, fileFilter });
console.log(' upload : '+upload);
module.exports = { upload };
