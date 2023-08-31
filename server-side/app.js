const DB_URL =
  "mongodb+srv://abdelrahmanadel203:Admin123@l3t1.isuzelt.mongodb.net/L3T1";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const Product = require("./models/product");
const User = require("./models/user");
mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
