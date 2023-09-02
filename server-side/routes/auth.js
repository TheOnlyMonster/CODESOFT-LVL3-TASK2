const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/sign-in",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  authController.signIn
)
module.exports = router