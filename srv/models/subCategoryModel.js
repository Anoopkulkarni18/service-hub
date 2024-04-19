import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String, Unique: true, required: true },
  key: { type: String, Unique: true, required: true },
  category: { type: String, required: true }
});

export default mongoose.model("subCategory", subCategorySchema);
