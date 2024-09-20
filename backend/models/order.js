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
  created_at: { type: String },
  order_status: { type: String },
  order_total: { type: String },
  items: [
    {
      title: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String },
      subTotal: { type: String },
    },
  ],
});

export const order = mongoose.model("Order", orderSchema);
