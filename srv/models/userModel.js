import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  mobileNumber: String,
  fname: String,
  lname: String,
});

export default mongoose.model("User", userSchema);
