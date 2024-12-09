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

export const updateOffer = async (req, res) => {
  try {
    const { offer } = req.body;
    const { offer_text, _id } = offer;

    const offers = await Admin.findOne({ "offer_Details._id": _id });
    const sub = offers.offer_Details.id(_id);

    sub.offer_text = offer_text;

    await offers.save();

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Server Error " + error.message });
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
