import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../../controllers/categoryController.js";

const router = Router();
router.post("/create", createCategory);
router.get("/getAllCategories", getAllCategories);

export default router;
