const multer = require('multer');
const path = require('path');
const fs = require('fs');
// import uuid from "uuid/v4";

const storageMultiple = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadMultiple = multer({
  storage: storageMultiple,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    // eslint-disable-next-line no-use-before-define
    checkFileType(file, cb);
  },
}).array('image', 12);

// Set storage engine
const storage = multer.diskStorage({
  destination: 'public/images',
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    // eslint-disable-next-line no-use-before-define
    checkFileType(file, cb);
  },
}).single('image');

// // Check file Type
// eslint-disable-next-line consistent-return
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb('Error: Images Only !!!');
}

module.exports = { uploadMultiple, upload };
