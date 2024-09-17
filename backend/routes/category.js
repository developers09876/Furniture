import { Router } from "express";

import { getAllCategory, createCategory } from "../controllers/category.js";
import { isLoggedIn } from "../middleware.js";
const router = Router();

// router.get("/:productId", getOneProduct);
router.get("/", getAllCategory);
router.post("/create", createCategory);

export default router;
