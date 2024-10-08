import { Test } from "../models/Test.js";

export const getAll = async (req, res) => {
  console.log("resss", req.body);

  try {
    const data = await Test.find();

    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newData = new Test(req.body);
    const savedCategory = await newData.save();
    res.status(200).json("test data added sucessfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
