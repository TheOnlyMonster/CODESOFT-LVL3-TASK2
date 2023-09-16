const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUpdatedCart = require("../utils/getUpdatedCart");
const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error();
      error.statusCode = 404;
      error.msg = "User not found";
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error();
      error.statusCode = 401;
      error.msg = "Wrong password";
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      "my-ultra-secure-and-ultra-long-secret-for-codsoft-level-3-task-2-project",
      {
        expiresIn: "1h",
      }
    );
    const updatedCart = await getUpdatedCart(user.cart.items, "productId");
    res.status(200).json({
      token,
      userId: user._id.toString(),
      Fname: user.Fname,
      Lname: user.Lname,
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};
const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      cart: { items: [] },
    });
    const savedUser = await user.save();
    console.log("User saved successfully!");
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signIn,
  signUp,
};
