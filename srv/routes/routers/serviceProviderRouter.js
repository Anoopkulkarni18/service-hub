import { Router } from "express";
import { handleAddServices, handleServiceProviderLogin, handleServiceProviderRegister,verifyToken } from "../../controllers/serviceProviderController.js";

const router = Router();

router.post("/register", handleServiceProviderRegister);
router.post("/login", handleServiceProviderLogin);
router.post("/addServices",verifyToken,handleAddServices)

export default router;
