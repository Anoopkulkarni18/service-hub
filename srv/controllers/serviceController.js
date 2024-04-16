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

export const getSearchService = async (req, res, next) => {
  try {
    const name = req.body.query;
    const searchRegex = new RegExp(name, "i");
    const searchedElements = await Service.find({ name: searchRegex });
    if (searchedElements.length === 0) {
      return res.status(404).json({ error: "No items found" });
    }

    res.status(200).json(searchedElements);
  } catch (error) {
    // Handle errors
    console.error("Error searching:", error);
    next(error);
  }
};
