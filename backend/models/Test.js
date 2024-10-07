import mongoose from "mongoose";

const { Schema } = mongoose;

const TestSchema = new Schema({
  testname: { type: String },
});

export const Test = mongoose.model("Test", TestSchema);
