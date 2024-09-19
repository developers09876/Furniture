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
  userName: { type: String },
  userID: { type: String },
  //   images: { type: [String] },
});

export const order = mongoose.model("Order", orderSchema);
