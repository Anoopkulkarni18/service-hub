import Order from "../models/orderModel.js";
import User from "./../models/userModel.js";
import serviceProviderModel from "../models/serviceProviderModel.js";
import ServiceListModel from "../models/serviceListModel.js";

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
    const user = await User.findOne({ email }).select("fname lname cart  -_id");

    const serviceObj = {};
    for (const cartObj of user.cart) {
      if (serviceObj[cartObj.service]) {
        serviceObj[cartObj.service] = [...serviceObj[cartObj.service], cartObj];
      } else {
        serviceObj[cartObj.service] = [cartObj];
      }
    }

    if (!user) {
      throw { status: 400 };
    }
    for (const sr in serviceObj) {
      await Order.create({
        orderId: generateOrderId(),
        userEmail: email,
        userName: `${user.fname} ${user.lname}`,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        userMobileNumber,
        service: sr,
        items: serviceObj[sr],
        status: "Pending",
      });
    }

    await User.updateOne({ email }, { $set: { cart: [] } });
    res.status(200).json({
      status: "success",
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
          status: "Accepted",
        },
      }
    );
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

export const getSPOrders = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const serviceProvider = await serviceProviderModel.findOne({ email });
    let servicesProvided = await ServiceListModel.find({
      serviceProviderEmail: email,
    }).select("serviceKey serviceName");
    const orders = await Order.find({
      status: "Pending",
      city: serviceProvider.city,
      service: { $in: servicesProvided.map((item) => item.serviceKey) },
    }).sort({ createdAt: 1 });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

export const getSPCompletedOrders = async (req, res, next) => {
  try {
    const { email } = req.serviceProvider;
    const orders = await Order.find({
      serviceProviderEmail: email,
    }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate(
      { orderId },
      {
        $set: {
          status: "Cancelled",
        },
      }
    );
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
