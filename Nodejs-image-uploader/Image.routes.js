const router = require('express').Router();
const path = require("path");
const multer = require("multer");

/**
 * Setup storage location
 */
const storage = multer.diskStorage({
  destination: "./media/image_uploads/",
  filename: function (req, file, cb) {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  },
  limits: {
    fileSize: 8388608,
  }
});

/**
 * Basic upload method
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.post('/upload', upload.single('image'), function (req, res, next) {
  if(req.file.filename)
    res.json('/media/image_uploads/' + req.file.filename);
});

module.exports = router;
