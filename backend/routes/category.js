import { Router } from "express";

import {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import { isLoggedIn } from "../middleware.js";
const router = Router();

// router.get("/:productId", getOneProduct);
router.get("/", getAllCategory);
router.post("/create", createCategory);
router.post("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
