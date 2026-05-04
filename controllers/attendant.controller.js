import Attendant from "../models/attendant.model.js";

// CREATE
export const createAttendant = async (req, res) => {
  try {
    const { staffId } = req.body;

    if (await Attendant.findOne({ staffId })) {
      return res.status(400).json({ error: "Staff ID already exists" });
    }

    const attendant = await Attendant.create(req.body);
    res.status(201).json(attendant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
export const getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find().sort({ createdAt: -1 });
    res.json(attendants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};