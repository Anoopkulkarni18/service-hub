import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: String,
  key: String,
  category: String,
});

export default mongoose.model("subCategory", subCategorySchema);
