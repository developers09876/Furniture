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
    const productId = req.params.id; // Retrieve custom productId from route parameters
    console.log("Product ID:", productId);

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

    // Parse specifications if it is a JSON string
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

    // Find the product by custom productId and update its fields
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
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
      }
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

// update quantity after place the order

export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = await Product.findOne({ productId: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const currentStock = Number(product.quantity_stock);

    product.quantity_stock = currentStock - quantity;

    if (product.quantity_stock < 0) {
      return res
        .status(400)
        .json({ message: "Insufficient stock to fulfill request" });
    }

    await product.save();

    res.status(200).json({
      message: "Quantity updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
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

export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const { order_status } = req.body;
    const updateOrder = await order.findByIdAndUpdate(
      orderId,
      { order_status },
      { new: true, runValidators: true } // Options to return updated document and run validators
    );

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(updateOrder); // Return the updated user data
    }
  } catch (error) {
    console.error("Error updating Order:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
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
