import { Router } from "express";

import {
  getAllProducts,
  getOneProduct,
  createProduct,
  getAllOrder,
  createOrder,
  updateOrder,
  userUpdateOrder,
  updateQuantity,
  deleteOrder,
  getOneOrder,
  updateProduct,
  // getAllCategory,
  // createCategory,
  deleteProduct,
} from "../controllers/product.js";
import { isLoggedIn } from "../middleware.js";
const router = Router();
router.get("/getOne/:productId", getOneProduct);
router.get("/", getAllProducts);
router.post("/create", createProduct);
//router.post('/create', upload.array('images', 5), createProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/edit/:id", updateProduct);
router.put("/editquantity/:id", updateQuantity);
router.get("/order", getAllOrder);
router.get("/getOrder/:productId", getOneOrder);
router.post("/createorder", createOrder);
router.post("/updateorder/:id", updateOrder);
router.put("/userUpdateOrder/:orderId", userUpdateOrder);
router.delete("/deleteorder/:id", deleteOrder);

export default router;
