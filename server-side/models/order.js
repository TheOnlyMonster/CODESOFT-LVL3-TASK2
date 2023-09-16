const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema);
