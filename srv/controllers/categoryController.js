import Category from "./../models/categoryModel.js";
export const createCategory = async (req, res, next) => {
  try {
    const { name, key } = req.body;
    const existingCategory = await Category.findOne({ key });
    if (existingCategory) {
      throw { statusCode: 409, message: `Category ALready Exist` };
    }
    await Category.create({ name, key });
    res.status(200).json({ msg: "Category Created Successfully" });
  } catch (err) {
    next(err);
  }
};
export const getAllCategories = async (req, res, next) => {
  try {
    res.status(200).json(await Category.find().select("name key -_id"));
  } catch (err) {
    next(err);
  }
};
