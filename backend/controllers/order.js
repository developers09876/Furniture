// import { order } from "../models/order.js";

// export const getAllOrder = async (req, res) => {
//   console.log("resss", req.body);

//   try {
//     const allorder = await order.find();

//     res.status(200).json(allorder);
//   } catch {
//     res.status(500).json({ message: error.message });
//   }
// };

// // export const getOneProduct = async (req, res) => {
// //   console.log("req.params.productId", req.params.productId);
// //   try {
// //     // Convert the productId to a number
// //     const productId = parseInt(req.params.productId, 10);

// //     if (isNaN(productId)) {
// //       return res.status(400).json({ message: "Invalid product ID format" });
// //     }

// //     // Use findOne to search by the productId field
// //     const product = await Product.findOne({ productId: productId });
// //     if (!product) return res.status(404).json({ message: "Product not found" });

// //     res.json(product);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const createOrder = async (req, res) => {
//   try {
//     const newProduct = new order(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("id", id);
//     const deletedCategory = await order.findByIdAndDelete({ _id: id });

//     if (!deletedCategory) {
//       return res.status(404).json({ message: "Product not found" }); // If the category doesn't exist
//     }

//     res.status(200).json({ message: "Product deleted successfully" }); // Success response
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
