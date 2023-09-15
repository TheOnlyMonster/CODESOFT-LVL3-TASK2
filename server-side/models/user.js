const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  Lname: {
    type: String,
    required: true,
  },
  Fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;

