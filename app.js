const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.EXECUTION_PORT;


let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(allowCrossDomain);
app.use(cors());

//ROUTES
require('./src/routes/adminseg_routes')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
