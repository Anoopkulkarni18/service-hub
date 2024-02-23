import { Router } from "express";
import {
  createSubCategory,
  getSubCategories,
} from "../../controllers/subCategoryController.js";

const router = Router();
router.post("/create", createSubCategory);
router.get("/getAll/:category", getSubCategories);

export default router;
