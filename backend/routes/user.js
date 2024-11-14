import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  createCart,
  deleteCartItem,
  clearCartItem,
  getCart,
  updateQuantity,
  createWhishlist,
  getWhishlist,
  deleteWhishItem,
  clearWhishlist,
  getOneUser,
  getAllUser,
  deleteUser,
  updateUser,
  enquiryUser,
  // getUserById,
  resetUsers,
  resetUser,
  checkVerifivationCode
  // whistlistUser,
} from "../controllers/user.js";
import { isLoggedIn } from "../middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify/password", checkVerifivationCode);
router.post("/enquiry", enquiryUser);
// router.get("/:id", getUserById);
router.post("/getUser", getOneUser);
router.get("/get", getAllUser);
router.post("/update/:id", updateUser);
router.put("/resetUser", resetUser);
router.post("/resetUsers", resetUsers);
router.post("/createCart", createCart);
router.get("/getCart/:id", getCart);
router.put("/updateQuantity/:userId/:productId", updateQuantity);
router.delete("/deleteCart/:userID/:productId", deleteCartItem);
router.delete("/clearCart/:userID", clearCartItem);
router.post("/createWhishlist", createWhishlist);
router.get("/getWhishlist/:id", getWhishlist);
router.delete("/deleteWhishlist/:userId/:productId", deleteWhishItem);
router.delete("/clearWhishlist/:userId", clearWhishlist);
router.delete("/delete/:id", deleteUser);
// router.post("/addtocard/:id" , addToCard )
// router.post("/whistlist", whistlistUser);
export default router;
