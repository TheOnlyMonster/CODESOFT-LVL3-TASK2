const Product = require("../models/product");
module.exports = async function getUpdatedCart(user) {
  const updatedCart = { items: [] };
  const updatedItems = [...user.cart.items];
  updatedCart.totalPrice = 0;
  for (const item of updatedItems) {
    const product = await Product.populate(item, { path: "productId" });
    const updatedProduct = {
      ...product.productId.toObject(),
      quantity: +item.quantity,
    };
    updatedCart.items.push(updatedProduct);
    updatedCart.totalPrice += +updatedProduct.price * +item.quantity;
  }
  return updatedCart;
};
