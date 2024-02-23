import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
  name: { type: String, Unique: true, required: true },
  key: { type: String, Unique: true, required: true },
  service: { type: String, Unique: true, required: true },
});

export default mongoose.model("SubService", subServiceSchema);
