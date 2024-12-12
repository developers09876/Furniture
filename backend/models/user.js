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
  created_at: {
    type: String,
    default: () => new Date().toLocaleDateString("en-GB"),
  },
  forgetPasswordCode: { type: Number },
  address_details: [
    {
      pincode: { type: Number },
      address: { type: String },
    },
  ],
  Carts: [
    {
      productId: { type: String },
      images: { type: [String], default: [] },
      title: { type: String, required: true },
      price: { type: String, required: true },
      discountPrice: { type: String },
      quantity: { type: Number },
      subTotal: { type: String },
      quantity_stock: { type: String, required: true },
    },
  ],
  Whishlist: [
    {
      productId: { type: String },
      images: { type: [String], default: [] },
      title: { type: String, required: true },
      price: { type: String, required: true },
      discountPrice: { type: String },
      quantity: { type: Number },
      subTotal: { type: String },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
