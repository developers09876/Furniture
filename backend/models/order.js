import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
import AutoIncrementFactory from "mongoose-sequence";

const { Schema } = mongoose;

const orderSchema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String },
  subTotal: { type: String },
  color: { type: String },
  category: { type: String },
  name: { type: String },
  userID: { type: String },
  Phone: { type: Number },
  Address: { type: String },
  Status: { type: String, default: "inital" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   images: { type: [String] },
});

export const order = mongoose.model("Order", orderSchema);
