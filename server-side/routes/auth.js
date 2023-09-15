const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const User = require("../models/user");
router.post(
  "/sign-in",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.signIn
);
router.post(
  "/sign-up",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email is already in use");
        }
        return true;
      }),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .withMessage(
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    body("confirmPassword")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }
        return true;
      }),
    body("Fname")
      .not()
      .isEmpty()
      .withMessage("First name is required"),
    body("Lname")
      .not()
      .isEmpty()
      .withMessage("Last name is required"),
  ],
  authController.signUp
);
module.exports = router;
