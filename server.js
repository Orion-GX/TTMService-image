const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

global.__basedir = __dirname;

// var corsOptions = {
//   origin: process.env.WEB_HOST
// };

app.use(cors());

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method + " : " + req.url);
  next()
});
initRoutes(app);
app.use("*", (req, res) => {
  res.status(404).json({
    result: "file not found",
  });
});

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
