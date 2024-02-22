import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: String,
  key: String,
  category: String,
  subCategory: String,
});

export default mongoose.model("Service", serviceSchema);
