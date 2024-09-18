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

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deletedCategory = await Category.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" }); // If the category doesn't exist
    }

    res.status(200).json({ message: "Category deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) category.name = name;
    if (description) category.description = description;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
