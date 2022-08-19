const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/assets/images/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname.replace(/s\g/, "")}`);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).array("file", 20);

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
