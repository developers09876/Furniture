import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
import AutoIncrementFactory from "mongoose-sequence";

const { Schema } = mongoose;

// Initialize the auto-increment factory
const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  discountPrice: { type: String },
  collection_: { type: String },
  color: { type: String },
  category: { type: String },
  images: { type: [String] },
  description: { type: String, required: true },
  LongDesc: { type: String },
  feature: { type: Boolean },
  rating: { type: Number },
  review: { type: Number },
  offer: { type: String },
  quantity_stock: { type: String, required: true },
  productId: { type: Number, unique: true }, // Auto-incrementing field
  specifications: [
    {
      product_Details: {
        feel: { type: String },
        cover_Type: { type: String },
        cover_Material: { type: String },
        matress_Type: { type: String },
        Usability: { type: String },
        dynamicFields: [
          { title: { type: String }, description: { type: String } },
        ],
      },
      product_Dimension: {
        thickness: { type: String },
        dimensions: { type: String },
      },
      product_Policies: {
        Warranty: { type: String },
        Shipping: { type: String },
        available_Offers: { type: Number },
        trial: { type: String },
      },
    },
  ],
});

// Apply the auto-increment plugin to the product schema
productSchema.plugin(AutoIncrement, { inc_field: "productId" });

export const Product = mongoose.model("Product", productSchema);
