import { order } from "../models/order.js";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.js"; // Adjust the path to your Product model
import multer from "multer";
const storage = multer.memoryStorage();
import mongoose from "mongoose";
const upload = multer({ storage });

export const getAllProducts = async (req, res) => {
  console.log("resss", req.body);
  const token = req.headers.authorization;

  try {
    const allProduct = await Product.find();

    res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  console.log("req.params.productId", req.params.productId);
  try {
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const product = await Product.findOne({ productId: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createProduct = async (req, res) => {
//   try {
//     console.log("Request body:", req.body, images); // Log the request body
//     // Log the uploaded file
//     // Extract data from the request body
//     const {
//       title,
//       price,
//       discountPrice,
//       collection_,
//       color,
//       category,
//       description,
//       LongDesc,
//       feature,
//       rating,
//       review,
//       offer,
//       images,
//       quantity_stock,
//       specifications, // Assuming specification is part of req.body
//     } = req.body;

//     let parsedSpecifications;
//     if (typeof specifications === "string") {
//       try {
//         parsedSpecifications = JSON.parse(specifications);
//       } catch (error) {
//         return res
//           .status(400)
//           .json({ message: '"specifications" is not valid JSON' });
//       }
//     } else {
//       parsedSpecifications = specifications; // If it's already an object
//     }
//     const newProduct = new Product({
//       title,
//       price,
//       discountPrice,
//       collection_,
//       color,
//       category,
//       description,
//       LongDesc,
//       feature,
//       rating,
//       review,
//       offer,
//       images,
//       quantity_stock,
//       //   images: imageUrl ? [imageUrl] : [], // Add image URL to images array
//       specifications: parsedSpecifications ? parsedSpecifications : [], // Parse specification if necessary
//     });

//     // Save the product in the database
//     const savedProduct = await newProduct.save();
//     res
//       .status(200)
//       .json({ message: "Product added successfully", product: savedProduct });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      title,
      price,
      discountPrice,
      collection_,
      color,
      category,
      description,
      LongDesc,
      feature,
      rating,
      review,
      offer,
      images, // Now images is defined before being used
      quantity_stock,
      specifications, // Assuming specifications is part of req.body
    } = req.body;

    // Log the request body after extracting images
    console.log("Request body:", req.body, images);

    let parsedSpecifications;
    if (typeof specifications === "string") {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        return res
          .status(400)
          .json({ message: '"specifications" is not valid JSON' });
      }
    } else {
      parsedSpecifications = specifications; // If it's already an object
    }

    const newProduct = new Product({
      title,
      price,
      discountPrice,
      collection_,
      color,
      category,
      description,
      LongDesc,
      feature,
      rating,
      review,
      offer,
      images,
      quantity_stock,
      specifications: parsedSpecifications ? parsedSpecifications : [], // Parse specifications if necessary
    });

    // Save the product in the database
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Product.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Product not found" }); // If the category doesn't exist
    }
    res.status(200).json({ message: "Product deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update api

export const updateProduct = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const productId = req.params.id;
    // Convert the productId to an ObjectId (if it's meant to match MongoDB's _id)
    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ message: "Invalid product ID" });
    // }

    const {
      title,
      price,
      discountPrice,
      collection_,
      color,
      category,
      description,
      LongDesc,
      feature,
      rating,
      review,
      offer,
      images,
      quantity_stock,
      specifications,
    } = req.body;

    let parsedSpecifications;
    if (typeof specifications === "string") {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        return res
          .status(400)
          .json({ message: '"specifications" is not valid JSON' });
      }
    } else {
      parsedSpecifications = specifications;
    }

    // Find the product by _id and update its fields

    const updatedProduct = await Product.findOneAndUpdate(
      productId, // Use the ObjectId for MongoDB's _id field
      {
        title,
        price,
        discountPrice,
        collection_,
        color,
        category,
        description,
        LongDesc,
        feature,
        rating,
        review,
        offer,
        images,
        quantity_stock,
        specifications: parsedSpecifications || [],
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//orders
export const getAllOrder = async (req, res) => {
  console.log("OrderDetail", req.body);

  try {
    const allorder = await order.find();

    res.status(200).json(allorder);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newProduct = new order(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deletedCategory = await order.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Order not found" }); // If the category doesn't exist
    }

    res.status(200).json({ message: "Order deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  const { productId } = req.params;
  console.log("req.paramsz", productId);

  try {
    // const parsedProductId = parseInt(productId, 10);

    const product = await order.find({ user_id: productId });

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
