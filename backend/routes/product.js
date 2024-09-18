import { Router } from "express";

import {
  getAllProducts,
  // getOneProduct,
  createProduct,
  // getAllCategory,
  // createCategory,
  deleteProduct,
} from "../controllers/product.js";
import { isLoggedIn } from "../middleware.js";
const router = Router();

// router.get("/:productId", getOneProduct);
router.get("/", getAllProducts);
router.post("/create", isLoggedIn, createProduct);
// router.post('/create', upload.array('images', 5), createProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
