import { Router } from "express";
import {
  createOffer,
  getOffer,
  createOfferText,
  updateOffer,
  deleteOfferText,
} from "../controllers/admin.js";

const router = Router();

router.post("/offer", createOffer);
router.post("/offertext", createOfferText);
router.get("/getoffer", getOffer);
router.put("/updateOfferText", updateOffer);
router.delete("/deleteOfferText/:id", deleteOfferText);
export default router;
