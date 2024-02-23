import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, Unique: true, required: true },
  key: { type: String, Unique: true, required: true },
});

export default mongoose.model("Category", categorySchema);
