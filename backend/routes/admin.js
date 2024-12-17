import { Router } from "express";
import {
  createOffer,
  getOffer,
  createOfferText,
  updateOffer,
  updateOfferText,
  deleteOfferText,
} from "../controllers/admin.js";

const router = Router();

router.post("/offer", createOffer);
router.post("/offertext", createOfferText);
router.get("/getoffer", getOffer);
router.put("/updateOffer", updateOffer);
router.put("/updateOfferText", updateOfferText);
router.delete("/deleteOfferText/:id", deleteOfferText);
export default router;
