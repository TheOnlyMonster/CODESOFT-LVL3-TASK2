const router = require("express").Router();
const { body } = require("express-validator");
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);

router.get("/products/price/:price", productController.getAllProductsFilterByPrice);

router.post(
  "/add-product",
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Title must contain only letters, numbers, and spaces"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({
        min: 10,
      })
      .withMessage("Description must be at least 10 characters long")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage("Description must contain only letters, numbers, and spaces"),
    body("image")
      .custom((value, { req }) => {
        const file = req.file;
        if (!file) {
          throw new Error("Image is required");
        }
        return true;
      }),
  ],
  productController.addProduct
);

module.exports = router;
