const Product = require("../models/product");
module.exports = async function getUpdatedCart(user) {
  const updatedCart = { ...user.cart };
  const updatedItems = [...user.cart.items];
  updatedCart.totalPrice = 0;
  for (const item of updatedItems) {
    const product = await Product.populate(item, { path: "productId" });
    updatedCart.items.push(product);
    updatedCart.totalPrice += +product.productId.price * +item.quantity;
  }
  console.log(updatedCart.totalPrice);
  return updatedCart;
};
