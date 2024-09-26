import { v2 as cloudinary } from 'cloudinary';
import { Product } from '../models/product.js'; // Adjust the path to your Product model
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const getAllProducts = async (req, res) => {
  console.log("resss");
  try {
    const allProduct = await Product.find();

    res.status(200).json(allProduct);
  } catch {
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
//     try {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         res.status(200).json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// Create product with image and specifications



// Route handler for creating a product
export const createProduct = async (req, res) => {
   
  try {
    console.log('Request body:', req.body , images);  // Log the request body
    // Log the uploaded file
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
      images,
      quantity_stock,
      specifications, // Assuming specification is part of req.body
    } = req.body;

    let parsedSpecifications;
    if (typeof specifications === 'string') {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        return res.status(400).json({ message: '"specifications" is not valid JSON' });
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
    //   images: imageUrl ? [imageUrl] : [], // Add image URL to images array
      specifications: parsedSpecifications? parsedSpecifications : [], // Parse specification if necessary
    });

    // Save the product in the database
    const savedProduct = await newProduct.save();

    console.log("ln11")

    res.status(200).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Use the upload middleware when defining the route
