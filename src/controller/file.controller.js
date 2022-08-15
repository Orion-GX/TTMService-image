const uploadImage = require("../middleware/upload");
const uploadFile = require("../middleware/upload.file");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

const upload = async (req, res) => {
  try {
    const folderName = __basedir + "/public/assets/images/";
    try {
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }
    await uploadImage(req, res);

    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let data = [];
    for (let io = 0; io < req.files.length; io++) {
      const element = req.files[io];
      let obj = {
        originalname: element.originalname,
        mimetype: element.mimetype,
        filename: element.filename,
        size: element.size,
      };
      data.push(obj);
    }
    res.status(200).send({
      message: "Uploaded the file successfully: ",
      data: data,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.files.originalname}. ${err}`,
    });
  }
};

const uploadFileDoc = async (req, res) => {
  try {
    const folderName = __basedir + "/public/assets/document/";
    try {
      console.log(folderName);
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }
    await uploadFile(req, res);

    if (req.files == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let data = [];
    for (let io = 0; io < req.files.length; io++) {
      const element = req.files[io];
      let obj = {
        originalname: element.originalname,
        mimetype: element.mimetype,
        filename: element.filename,
        size: element.size,
      };
      data.push(obj);
    }
    res.status(200).send({
      message: "Uploaded the file successfully: ",
      data: data,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.files.originalname}. ${err}`,
    });
  }
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.sendFile(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  download,
};
