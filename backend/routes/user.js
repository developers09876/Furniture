import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  createCart,
  getCart,
  createWhishlist,
  getOneUser,
  getAllUser,
  deleteUser,
  updateUser,
  enquiryUser,
  // getUserById,
  resetUsers,
  resetUser,
  // whistlistUser,
} from "../controllers/user.js";
import { isLoggedIn } from "../middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/enquiry", enquiryUser);
// router.get("/:id", getUserById);
router.post("/getUser", getOneUser);
router.get("/get", getAllUser);
router.post("/update/:id", updateUser);
router.put("/resetUser", resetUser);
router.post("/resetUsers", resetUsers);
router.post("/createCart", createCart);
router.post("/createWhishlist", createWhishlist);
router.get("/getCard/:userId", getCart);
router.delete("/delete/:id", deleteUser);
// router.post("/addtocard/:id" , addToCard )
// router.post("/whistlist", whistlistUser);
export default router;
