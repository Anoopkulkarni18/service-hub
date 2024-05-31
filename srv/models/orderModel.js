import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    userEmail: String,
    userMobileNumber: String,
    serviceProviderEmail: String,
    serviceProviderModileNumber: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    userName: String,
    serviceProviderName: String,
    status: String,
    items: [itemsSchema],
    service: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model("Order", orderSchema);
