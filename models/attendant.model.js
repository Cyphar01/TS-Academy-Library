import mongoose from "mongoose";

const attendantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  staffId: { type: String, unique: true, required: true },
}, { timestamps: true });


export default mongoose.model("Attendant", attendantSchema);
