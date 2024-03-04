import { Router } from "express";
import { addServices, getAllServices, handleServiceProviderLogin, handleServiceProviderRegister, verifyToken } from "../../controllers/serviceProviderController.js";

const router = Router();

router.post("/register", handleServiceProviderRegister);
router.post("/login", handleServiceProviderLogin);
router.post("/addServices", verifyToken, addServices);
router.get("/getServices", verifyToken, getAllServices);

export default router;
