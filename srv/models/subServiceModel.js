import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema({
  name: String,
  key: String,
  category: String,
  subCategory: String,
  service: String,
});

export default mongoose.model("SubService", subServiceSchema);
