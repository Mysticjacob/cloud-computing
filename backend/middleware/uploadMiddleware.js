const multer = require("multer");
const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only specific types
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".png", ".jpeg", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return cb(new Error("Invalid file type"), false);
  }
  
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
