import Service from "./../models/ServiceModel.js";
export const createService = async (req, res, next) => {
  try {
    const { name, key, subCategory } = req.body;
    const existingService = await Service.findOne({ key });

    if (existingService) {
      throw { statusCode: 500, message: `Service already exists` };
    }
    await Service.create({
      name,
      key,
      subCategory,
    });
    res.status(200).send("Service successfully created");
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const { subCategory } = req.params;
    res
      .status(200)
      .json(
        await Service.find({ subCategory }).select("name key subCategory -_id")
      );
  } catch (err) {
    next(err);
  }
};
