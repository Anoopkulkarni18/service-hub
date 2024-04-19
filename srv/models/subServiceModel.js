import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
  name: { type: String, Unique: true, required: true },
  key: { type: String, Unique: true, required: true },
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model("SubService", subServiceSchema);
