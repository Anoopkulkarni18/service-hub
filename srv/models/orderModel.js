import mongoose from "mongoose";

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
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model("Order", orderSchema);
