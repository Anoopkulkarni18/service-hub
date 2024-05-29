import SubService from "./../models/subServiceModel.js";
export const createSubService = async (req, res, next) => {
  try {
    const { name, key, service, description, price } = req.body;
    const subService = await SubService.findOne({ name });
    if (subService) {
      throw { statusCode: 409, message: "Sub service already exists" };
    }
    const newSubService = await SubService.create({
      name,
      key,
      service,
      description,
      price,
    });
    res.status(200).json(newSubService);
  } catch (error) {
    next(error);
  }
};

export const getSubServices = async (req, res, next) => {
  try {
    const { service } = req.params;
    res
      .status(200)
      .json(await SubService.find({ service }).select("name key service price description -_id"));
  } catch (err) {
    next(err);
  }
};
