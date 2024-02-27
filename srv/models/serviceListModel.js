import mongoose from "mongoose";

const serviceListSchema = new mongoose.Schema({
  serviceProviderEmail: String,
  serviceKey: String,
  serviceName: String,
});

export default mongoose.model("seviceList", serviceListSchema);
