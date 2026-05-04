import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  studentId: { type: String, unique: true, required: true },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);