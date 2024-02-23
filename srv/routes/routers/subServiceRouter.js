import { Router } from "express";
import {
  createSubService,
  getSubServices,
} from "../../controllers/subServiceController.js";

const router = Router();
router.post("/create", createSubService);
router.get("/getAll/:service", getSubServices);

export default router;
