import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
import AutoIncrement from "mongoose-sequence";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  //   CategoryId: { type: Number, unique: true }, // Auto-incrementing field
});
// CategorySchema.plugin(AutoIncrement, { inc_field: "CategoryId" });

export const Category = mongoose.model("category", CategorySchema);
