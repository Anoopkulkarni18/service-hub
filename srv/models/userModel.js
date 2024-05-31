import mongoose, { Mongoose } from "mongoose";

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: String,
  fname: String,
  lname: String,
  location: String,
  cart: [cartItemSchema],
});

export default mongoose.model("User", userSchema);
