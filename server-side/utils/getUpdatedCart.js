const Product = require("../models/product");
module.exports = async function getUpdatedCart(items, path) {
  const updatedCart = { items: [] };
  const updatedItems = [...items];
  updatedCart.totalPrice = 0;
  for (const item of updatedItems) {
    const product = await Product.populate(item, { path: path });
    const updatedProduct = {
      ...product[path].toObject(),
      quantity: +item.quantity,
    };
    updatedCart.items.push(updatedProduct);
    updatedCart.totalPrice += +updatedProduct.price * +item.quantity;
  }
  return updatedCart;
};
