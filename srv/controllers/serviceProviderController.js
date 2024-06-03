import serviceProviderModel from "../models/serviceProviderModel.js";
import ServiceListModel from "../models/serviceListModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSign = (jwtObj) => {
  return jwt.sign(jwtObj, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = async (req, res, next) => {
  try {
    req.serviceProvider = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    next(error);
  }
};
export const handleServiceProviderRegister = async (req, res, next) => {
  try {
    const { email, password, mobileNumber, fname, lname, city } = req.body;
    const existingServiceProvider = await serviceProviderModel.findOne({
      email,
    });
    if (existingServiceProvider) {
      throw { statusCode: 409, message: `Service provider already exists` };
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await serviceProviderModel.create({
      email,
      password: hashedPassword,
      mobileNumber,
      fname,
      lname,
      city,
    });
    const token = jwtSign({ email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const handleServiceProviderLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentServiceProvider = await serviceProviderModel.findOne({
      email,
    });
    if (!currentServiceProvider) {
      throw { statusCode: 409, message: `Email not found` };
    }
    const isPasswordCorrect = await bcrypt.compareSync(
      password,
      currentServiceProvider.password
    );
    if (!isPasswordCorrect) {
      throw { statusCode: 409, message: `Invalid Credentials` };
    }
    const token = jwtSign({ email });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const addServices = async (req, res, next) => {
  try {
    const { serviceKeys } = req.body;
    const serviceProviderEmail = req.serviceProvider.email;
    let serviceProvidedList = await ServiceListModel.find({
      serviceProviderEmail,
    });
    serviceProvidedList = serviceProvidedList.map((sl) => sl.serviceKey);
    for (let serviceObj of serviceKeys) {
      if (!serviceProvidedList.includes(serviceObj.key)) {
        await ServiceListModel.create({
          serviceProviderEmail,
          serviceKey: serviceObj.key,
          serviceName: serviceObj.name,
        });
      }
    }
    res.status(200).send("Services Added Successfully");
  } catch (err) {
    next(err);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const serviceProviderEmail = req.serviceProvider.email;
    let servicesProvided = await ServiceListModel.find({
      serviceProviderEmail,
    }).select("serviceKey serviceName");
    res.status(200).json({ servicesProvided });
  } catch (err) {
    next(err);
  }
};

export const removeService = async (req, res, next) => {
  try {
    const serviceProviderEmail = req.serviceProvider.email;
    const { serviceKey } = req.params;
    if (serviceKey) {
      await ServiceListModel.deleteOne({
        serviceProviderEmail: serviceProviderEmail,
        serviceKey: serviceKey,
      });
    }
    res.status(200).send("Service Removed Successfully");
  } catch (err) {
    next(err);
  }
};
