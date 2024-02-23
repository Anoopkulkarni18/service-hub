import SubCategory from "./../models/subCategoryModel.js";

export const createSubCategory = async (req, res, next) => {
  try {
    const { name, key, category } = req.body;
    const SubCategory = await SubCategory.findOne({ name });
    if (SubCategory) {
      throw { statusCode: 409, message: `Sub Category already exists` };
    }
    const newSubCategory = await SubCategory.create({
      name,
      key,
      category,
    });
    res.status(200).json(newSubCategory);
  } catch (err) {
    next(err);
  }
};

export const getSubCategories = async (req, res, next) => {
  try {
    const { category } = req.params;
    res
      .status(200)
      .json(
        await SubCategory.find({ category }).select("name key category -_id")
      );
  } catch (err) {
    next(err);
  }
};
