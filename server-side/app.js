const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const DB_URL = process.env.CONNECTION_URL;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client-side/public/uploads");
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
  console.log(error);
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  if (!error.msg) {
    error.msg = "Something went wrong!";
  }
  res.status(error.statusCode).json(error);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
