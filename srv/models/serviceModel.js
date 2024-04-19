import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, Unique: true, required: true },
  key: { type: String, Unique: true, required: true },
  subCategory: { type: String,  required: true }
});

export default mongoose.model("Service", serviceSchema);
