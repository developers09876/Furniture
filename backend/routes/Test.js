import { Router } from "express";

import { getAll, create } from "./../controllers/Test.js";
import { isLoggedIn } from "../middleware.js";
const router = Router();

router.get("/getAll", getAll);
router.post("/create", create);
router.post("/create", create);
export default router;
