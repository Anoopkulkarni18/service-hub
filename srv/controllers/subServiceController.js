import SubService from "./../models/subServiceModel.js";
export const createSubService = async (req, res, next) => {
  const { name, key, service } = req.body;
};

export const getSubServices = async (req, res, next) => {
  try {
    const { service } = req.params;
    res
      .status(200)
      .json(await SubService.find({ service }).select("name key service -_id"));
  } catch (err) {
    next(err);
  }
};
