// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const whistlistSchema = new Schema({
//   product_id: { type: Number },
//   product_name: { type: String },
//   user_id: { type: Number },
//   user_name: { type: String },
// });

// export const whistlist = mongoose.model("whistlist", whistlistSchema);


// import mongoose from "mongoose";

// const { Schema, model } = mongoose;

// const WishlistSchema = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User", // Assuming a user schema exists
//     },
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Product", // Assuming a product schema exists
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: ["active", "removed"], // Optional status for wishlist item
//       default: "active",
//     },
//     addedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// WishlistSchema.set("autoIndex", true);



// export const whistlists = mongoose.model("whistlists", whistlistSchema)
