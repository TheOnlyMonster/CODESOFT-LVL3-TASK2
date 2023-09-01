const router = require("express").Router();
const { body } = require("express-validator");
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);

router.post("/add-product",
  [
    body("title").not().isEmpty().withMessage("Title is required").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("price", "Price is required").not().isEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number"),
    body("description", "Description is required").not().isEmpty().withMessage("Description is required").isLength({
      min: 10,
    }).withMessage("Description must be at least 10 characters long"),
    body("image", "Image is required").not().isEmpty().withMessage("Image is required").custom((value, { req }) => {
      const file = req.file;
      if (!file) {
        throw new Error("Image is required");
      }
      return true;
    })
  ],
  productController.addProduct
);

module.exports = router;
