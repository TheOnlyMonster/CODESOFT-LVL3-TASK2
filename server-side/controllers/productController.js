const Product = require("../models/product");
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  console.log(req.body);
  // try {
  //   const { title, price, description, image } = req.body;
  //   const product = new Product({ title, price, description, image });
  //   await product.save();
  //   res.status(201).json(product);
  // } catch (error) {
  //   next(error);
  // }
};
module.exports = {
  getAllProducts,
  addProduct,
};
