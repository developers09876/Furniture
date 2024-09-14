import { Router } from "express";

import {
  getAllProducts,
  getOneProduct,
  createProduct,
} from "../controllers/product.js";

const router = Router();

router.get("/:productId", getOneProduct);
router.get("/", getAllProducts);
router.post("/create", createProduct);
// router.post('/create', upload.array('images', 5), createProduct);

export default router;
