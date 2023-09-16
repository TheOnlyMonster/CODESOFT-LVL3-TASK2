const router = require("express").Router();
const { body, param } = require("express-validator");
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/authUser");
const Product = require("../models/product");
router.get("/products", productController.getAllProducts);
router.get(
  "/products/price/:price",
  productController.getAllProductsFilterByPrice
);
router.post(
  "/add-product",
  isAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
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
      .withMessage("Description must be at least 10 characters long"),
    body("image").custom((value, { req }) => {
      const file = req.file;
      if (!file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ],
  productController.addProduct
);
router.post(
  "/add-to-cart/:id",
  isAuth,
  [
    param("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .custom(async (value, { req }) => {
        const product = await Product.findById(value);
        if (!product) {
          throw new Error("Product not found");
        }
        return true;
      }),
    body("quantity")
      .not()
      .isEmpty()
      .withMessage("Quantity is required")
      .isNumeric()
      .withMessage("Quantity must be a number")
      .isLength({ min: 1 })
      .withMessage("Quantity must be greater than or equal to 1"),
  ],
  productController.addToCart
);
router.delete(
  "/delete-product/:id",
  isAuth,
  [
    param("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .custom(async (value, { req }) => {
        const product = await Product.findById(value);
        if (!product) {
          throw new Error("Product not found");
        }
        return true;
      }),
  ],
  productController.removeProduct
);
router.get(
  "/cart",
  isAuth,
  [
  ]
)
module.exports = router;
