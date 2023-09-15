const { validationResult } = require("express-validator");
const PER_PAGE = 10;
const User = require("../models/user");
const Product = require("../models/product");
const getUpdatedCart = require("../utils/getUpdatedCart");
const getAllProducts = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;

  try {
    const { products, productsCount, lowestPrice, highestPrice } =
      await fetchProducts(skip);

    res.status(200).json({
      products,
      productsCount,
      highestPrice,
      lowestPrice,
    });
  } catch (error) {
    next(error);
  }
};
const removeProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    const [lowestPriceProduct, highestPriceProduct] = await Promise.all([
      Product.findOne().sort({ price: 1 }),
      Product.findOne().sort({ price: -1 }),
    ]);
    const lowestPrice = lowestPriceProduct ? lowestPriceProduct.price : 0;
    const highestPrice = highestPriceProduct ? highestPriceProduct.price : 100;
    const users = await User.find();
    for (const user of users) {
      const cart = user.cart;
      const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );
      if (productIndex >= 0) {
        cart.items.splice(productIndex, 1);
      }
      await user.save();
    }
    res.status(200).json({ product, lowestPrice, highestPrice });
  } catch (error) {
    next(error);
  }
};
const addToCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    error.statusCode = 422;
    return next(error);
  }
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.userId);
    const cart = user.cart;
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );
    if (productIndex >= 0) {
      cart.items[productIndex].quantity += req.body.quantity;
    } else {
      cart.items.push({
        productId: product._id,
        quantity: req.body.quantity,
      });
    }
    await user.save();
    const updatedCart = await getUpdatedCart(user);
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};
const getAllProductsFilterByPrice = async (req, res, next) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * PER_PAGE;
  const price = req.params.price;
  const [minPrice, maxPrice] = price.split(",").map(Number);

  try {
    const { products, productsCount, lowestPrice, highestPrice } =
      await fetchProducts(skip, minPrice, maxPrice);
    res.status(200).json({
      products,
      productsCount,
      highestPrice,
      lowestPrice,
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
const fetchProducts = async (skip, minPrice = null, maxPrice = null) => {
  const [lowestPriceProduct, highestPriceProduct] = await Promise.all([
    Product.findOne().sort({ price: 1 }),
    Product.findOne().sort({ price: -1 }),
  ]);

  const lowestPrice = lowestPriceProduct ? lowestPriceProduct.price : 0;
  const highestPrice = highestPriceProduct ? highestPriceProduct.price : 100;

  const productsQuery =
    minPrice && maxPrice
      ? {
          price: { $gte: minPrice, $lte: maxPrice },
        }
      : {};

  const products = await Product.find(productsQuery).skip(skip).limit(PER_PAGE);

  const productsCount = await Product.countDocuments(productsQuery);

  return { products, productsCount, lowestPrice, highestPrice };
};
module.exports = {
  getAllProducts,
  addProduct,
  getAllProductsFilterByPrice,
  removeProduct,
  addToCart,
};
