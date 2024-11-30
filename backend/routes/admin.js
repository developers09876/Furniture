import { Router } from "express";
import { createOffer } from "../controllers/admin.js";

const router = Router();

router.post("/offer", createOffer);

export default router;
