import { Router } from "express";
import {
  createService,
  getServices,
} from "../../controllers/serviceController.js";

const router = Router();
router.post("/create", createService);
router.get("/getAll/:subCategory", getServices);

export default router;
