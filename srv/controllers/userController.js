import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSign = (jwtBody) => {
  return jwt.sign(jwtBody, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const handleRegister = async (req, res, next) => {
  try {
    const { email, password, mobileNumber, fname, lname } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "User already registered" };
    }
    const newUser = await User.create({
      email,
      password: hashedPassword,
      mobileNumber,
      fname,
      lname,
    });
    const token = jwtSign({ email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      currentUser.password
    );
    if (!isPasswordCorrect) {
      throw { statusCode: 401, message: "Invalid Email" };
    }
    const token = jwtSign({ email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
