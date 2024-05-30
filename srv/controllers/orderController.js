import Order from "../models/orderModel.js";
import User from "./../models/userModel.js";
import serviceProviderModel from "../models/serviceProviderModel.js";

const generateOrderId = () => {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
  return `OID${timestamp}${randomNum}`;
};

export const createOrder = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      userMobileNumber,
    } = req.body;
    const user = await User.findOne({ email }).select("fname lname  -_id");
    if (!user) {
      throw { status: 400 };
    }
    const order = await Order.create({
      orderId: generateOrderId(),
      userEmail: email,
      userName: `${user.fname} ${user.lname}`,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      userMobileNumber,
    });
    res.status(200).json({
      status: "success",
      orderId: order.orderId,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const orders = await Order.find({ userEmail: email }).sort({
      createdAt: -1,
    });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

export const acceptOrder = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const serviceProvider = await serviceProviderModel.findOne({ email });
    const { orderId } = req.params;
    const order = await Order.updateOne(
      { orderId },
      {
        $set: {
          serviceProviderEmail: email,
          serviceProviderModileNumber: serviceProvider.mobileNumber,
          serviceProviderName: `${serviceProvider.fname} ${serviceProvider.lname}`,
        },
      }
    );
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
