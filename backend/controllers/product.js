import { Product } from "../models/product.js";
import { Category } from "../models/category.js";

export const getAllProducts = async (req, res) => {
  console.log("resss", req.body);
  const token = req.headers.authorization;

  try {
    // const token = req.headers.authorization;

    // const decodedToken = jwt.decode(token);
    // const tokenId = decodedToken.id;

    // if (tokenId !== userId) {
    //   return res
    //     .status(HTTP_RESPONSE.UNAUTHORIZED.CODE)
    //     .json(HTTP_RESPONSE.UNAUTHORIZED.MESSAGE);
    // }
    const allProduct = await Product.find();

    res.status(200).json(allProduct);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  console.log("req.params.productId", req.params.productId);
  try {
    // Convert the productId to a number
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Use findOne to search by the productId field
    const product = await Product.findOne({ productId: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//catergories

export const getAllCategory = async (req, res) => {
  try {
    const allProduct = await Category.find();
    res.status(200).json(allProduct);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
