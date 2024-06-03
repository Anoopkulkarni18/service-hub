import { Router } from "express";
import {
  addServices,
  getAllServices,
  handleServiceProviderLogin,
  handleServiceProviderRegister,
  verifyToken,
  removeService,
} from "../../controllers/serviceProviderController.js";

const router = Router();

router.post("/register", handleServiceProviderRegister);
router.post("/login", handleServiceProviderLogin);
router.post("/addServices", verifyToken, addServices);
router.get("/getServices", verifyToken, getAllServices);
router.get("/removeService/:serviceKey", verifyToken, removeService);

export default router;
