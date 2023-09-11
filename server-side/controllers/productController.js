const Product = require("../models/product");
const { validationResult } = require("express-validator");
const PER_PAGE = 10;
const getAllProducts = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;
  try {
    const productsCount = await Product.countDocuments();
    const highestPriceProduct = await Product.find().sort({ price: -1 }).limit(1);
    const lowestPriceProduct = await Product.find().sort({ price: 1 }).limit(1);
    const lowestPrice = lowestPriceProduct[0].price;
    const highestPrice = highestPriceProduct[0].price;
    const products = await Product.find().skip(skip).limit(PER_PAGE);
    res.status(200).json({
      products,
      productsCount,
      highestPrice,
      lowestPrice
    });
  } catch (error) {
    next(error);
  }
};

const getAllPrice = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;
  const price = req.params.price;
  const priceRange = price.split(',').map(Number);
  const [minPrice, maxPrice] = priceRange;
  try {
    const productsCount = await Product.countDocuments({price: {$gte: minPrice, $lte: maxPrice}});
    const highestPriceProduct = await Product.find().sort({ price: -1 }).limit(1);
    const lowestPriceProduct = await Product.find().sort({ price: 1 }).limit(1);
    const lowestPrice = lowestPriceProduct[0].price;
    const highestPrice = highestPriceProduct[0].price;
    const products = await Product.find({price: {$gte: minPrice, $lte: maxPrice}}).skip(skip).limit(PER_PAGE);
    res.status(200).json({
      products,
      productsCount,
      highestPrice,
      lowestPrice
    });
  } catch (error) {
    next(error);
  }
}
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
  getAllPrice
};
