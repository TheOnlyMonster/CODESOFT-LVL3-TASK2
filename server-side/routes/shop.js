const router = require("express").Router();
const { body, param } = require("express-validator");
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/authUser");
const Product = require("../models/product");
const cartValidation = async (isCheckout, value, { req }) => {
  const items = value;
  if (!Array.isArray(items)) return new Error("Cart is not an array");
  if (isCheckout && items.length === 0) return new Error("Cart is empty");
  for (const item of items) {
    if (!item._id) return new Error("Product ID is required");
    const product = await Product.findById(item?._id);
    if (!product) return new Error("Product not found");
    const quantity = +item?.quantity;
    if (!quantity) return new Error("Quantity is required");
    if (isCheckout && quantity <= 0) return new Error("Quantity can't be 0");
  }
  return true;
};
router.get("/products", productController.getAllProducts);
router.get(
  "/products/price/:price",
  [
    param("price")
      .isNumeric()
      .withMessage("Price must be a number")
      .isLength({ min: 1 })
      .withMessage("Price must be at least 1 number"),
  ],
  productController.getAllProductsFilterByPrice
);
router.get(
  "/products/search/:searchValue",
  [
    param("searchValue")
      .not()
      .isEmpty()
      .withMessage("Search value is required"),
  ],
  productController.searchProducts
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
router.post(
  "/checkout",
  isAuth,
  body("items")
    .not()
    .isEmpty()
    .withMessage("Cart is required")
    .custom(async (value, { req }) => {
      const res = await cartValidation(true, value, { req });
      if (res instanceof Error) throw res;
      return true;
    }),
  productController.postCheckout
);
router.post(
  "/update-cart",
  isAuth,
  body("items").custom(async (value, { req }) => {
    const res = await cartValidation(false, value, { req });
    if (res instanceof Error) throw res;
    return true;
  }),
  productController.updateCart
);
router.get("/cart", isAuth, productController.getUserCart);
router.get("/orders", isAuth, productController.getOrders);
module.exports = router;
