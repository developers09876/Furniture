import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../controllers/user.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/:id", getUserById);

export default router;
