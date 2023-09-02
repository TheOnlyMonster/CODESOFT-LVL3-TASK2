const Product = require("../models/product");
const { validationResult } = require("express-validator");
const PER_PAGE = 5;
const getAllProducts = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;
  try {
    const productsCount = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(PER_PAGE);
    res.status(200).json({
      products,
      productsCount,
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  try {
    const image = req.file.path;
    const { title, price, description } = req.body;
    const product = new Product({ title, price, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProducts,
  addProduct,
};
