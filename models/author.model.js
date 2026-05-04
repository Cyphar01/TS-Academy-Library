import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
}, { timestamps: true });



export default mongoose.model("Author", authorSchema);