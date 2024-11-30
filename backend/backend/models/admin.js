import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminSchema = new Schema({
  offer: { type: Number, required: true },
  offer_Details: [
    {
      offer_text: { type: String },
    },
  ],
});

export const Admin = mongoose.model("Admin", AdminSchema);
