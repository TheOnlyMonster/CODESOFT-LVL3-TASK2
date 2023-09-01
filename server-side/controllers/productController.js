const Products = require("../models/product");
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProducts,
};
