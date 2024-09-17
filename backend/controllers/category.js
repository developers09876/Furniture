import { Category } from "../models/category.js";

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
