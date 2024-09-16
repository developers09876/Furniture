import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  getUserById,
  createCart,
} from "../controllers/user.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/:id", getUserById);
router.post("/createCart", createCart);
export default router;
