import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  createCart,
  getAllUser,
  deleteUser,
  updateUser,
  enquiryUser,
  // getUserById,
} from "../controllers/user.js";
import { isLoggedIn } from "../middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/enquiry", enquiryUser);
// router.get("/:id", getUserById);
router.get("/get", getAllUser);
router.post("/update/:id", updateUser);
router.post("/createCart", createCart);
router.delete("/delete/:id", deleteUser);

export default router;
