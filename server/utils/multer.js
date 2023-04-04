const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/uploads/");
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mov" ||
    file.mimetype === "video/wmv"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format!" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 28 },
  fileFilter: fileFilter,
});

module.exports = upload;
