import { Router } from "express";
import {
  createService,
  getSearchService,
  getServices,
} from "../../controllers/serviceController.js";

const router = Router();
router.post("/create", createService);
router.get("/getAll/:subCategory", getServices);
router.post("/search",getSearchService)

export default router;
