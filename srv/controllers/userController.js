import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const verifyToken = async (req, res, next) => {
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
const jwtSign = (jwtBody) => {
  return jwt.sign(jwtBody, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const handleRegister = async (req, res, next) => {
  try {
    const { email, password, mobileNumber, fname, lname, location } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { statusCode: 409, message: "User already registered" };
    }
    await User.create({
      email,
      password: hashedPassword,
      mobileNumber,
      fname,
      lname,
      location,
      cart: [],
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
      throw { statusCode: 401, message: "Invalid Credentials" };
    }
    const token = jwtSign({ email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const user = await User.findOne({ email }).select("-password -_id");
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const { cart } = req.body;
    const updatedUser = await User.updateOne({ email }, { $set: { cart } });
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error updating cart:", err);
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const user = await User.findOne({ email });
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    next(err);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.serviceProvider;
    

  } catch (error) {}
};
