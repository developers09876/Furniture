import mongoose from "mongoose";
const { Schema } = mongoose;

const whistlistSchema = new Schema({
  product_id: { type: Number },
  product_name: { type: String },
  user_id: { type: Number },
  user_name: { type: String },
});

export const whistlist = mongoose.model("whistlist", whistlistSchema);
