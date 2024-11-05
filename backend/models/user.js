import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true,
  },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  Carts: { type: Array },
  CreatedAt: { type: Date, default: Date.now },

  Carts: [
    {
      productId: { type: String },
      title: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String },
      subTotal: { type: String },
    },
  ],
  Whishlist: [
    {
      productId: { type: String },
      title: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String },
      subTotal: { type: String },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
