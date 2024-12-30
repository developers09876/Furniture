import { message } from "antd";
import { Admin } from "../models/admin.js";

export const createOffer = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { offer } = req.body;
    const extractedOffer = offer.offer;

    const offers = new Admin({
      offer: extractedOffer,
    });
    const newOffer = await offers.save();
    res.status(200).json(newOffer);
    res.status(200).json(getOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOfferText = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { offer_text } = req.body;

    const offerText = await Admin.findOne();
    offerText.offer_Details.push({ offer_text });
    const newOffer = await offerText.save();
    res.status(200).json(newOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffer = async (req, res) => {
  try {
    const getOffer = await Admin.find();
    res.status(200).json(getOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOfferDetails = async (req, res) => {
  try {
    const { offerText, percentage } = req.body;
    let mainOffer;
    console.log("percentage", percentage);
    console.log("percentageID", percentage.offer_id);
    console.log("perc", percentage.sales_timing);

    if (offerText && offerText._id) {
      const { offer_text, _id: offerDetailId } = offerText;

      mainOffer = await Admin.findOne({
        "offer_Details._id": offerDetailId,
      });

      const offerDetail = mainOffer.offer_Details.id(offerDetailId);

      offerDetail.offer_text = offer_text;
    }

    if (percentage && percentage.offer_id) {
      const { precentage, offer_id, sales_timing } = percentage;
      console.log("sales_timing", sales_timing);
      if (!mainOffer) {
        mainOffer = await Admin.findById(offer_id[0]);
      }

      mainOffer.offer = precentage;
      mainOffer.sales_timing = sales_timing;
    }

    if (mainOffer) {
      await mainOffer.save();
      return res
        .status(200)
        .json({ message: "Offer details updated successfully", mainOffer });
    }

    res.status(400).json({ message: "No valid updates provided" });
  } catch (error) {
    console.error("Error updating offer details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteOfferText = async (req, res) => {
  try {
    const { id } = req.params;
    const offers = await Admin.findOne({ "offer_Details._id": id });
    offers.offer_Details = offers.offer_Details.filter(
      (detail) => detail._id.toString() !== id
    );
    await offers.save();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server Error " + error.message });
  }
};
