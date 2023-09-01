const DB_URL =
  "mongodb+srv://abdelrahmanadel203:Admin123@l3t1.isuzelt.mongodb.net/L3T1";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const shopRouter = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(shopRouter);


mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
