const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
    path: "./.env"
})

global.__basedir = __dirname;

// var corsOptions = {
//   origin: process.env.WEB_HOST
// };

app.use(cors());

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
