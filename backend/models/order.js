import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
import AutoIncrementFactory from "mongoose-sequence";

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: String },
  name: { type: String },
  phone: { type: String },
  shipping_address: { type: String },
  description: { type: String },
  delivery_company: { type: String },
  delivery_cost: { type: String },
  created_at: {
    type: String,
    default: () => new Date().toLocaleDateString("en-GB"),
  },
  order_status: { type: String },
  order_total: { type: String },
  items: [
    {
      productId: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: String, required: true },
      discountPrice: { type: String, required: true },
      quantity: { type: String },
      subTotal: { type: String },
    },
  ],
});

export const order = mongoose.model("Order", orderSchema);
