const DB_URL =
  "mongodb+srv://abdelrahmanadel203:Admin123@l3t1.isuzelt.mongodb.net/L3T1";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client-side/src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(multer({ storage, fileFilter }).single("image"));
app.use(bodyParser.json());
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");
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
app.use(authRouter);
app.use(shopRouter);

app.use((error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  if (!error.msg) {
    error.msg = "Something went wrong!";
  }
  console.log(error);
  res.status(error.statusCode).json(error);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
