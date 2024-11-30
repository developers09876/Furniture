import { message } from "antd";
import { Admin } from "../models/admin.js";

export const createOffer = async (req, res) => {
  try {
    const { offer, offer_Details } = req.body;
    const transformedOfferDetails = Array.isArray(offer_Details)
      ? offer_Details.map((detail) => ({ offer_text: detail }))
      : [];

    const offers = new Admin({
      offer,
      offer_Details: transformedOfferDetails,
    });

    const newOffer = await offers.save();
    res.status(200).json(newOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: error.message });
  }
};
