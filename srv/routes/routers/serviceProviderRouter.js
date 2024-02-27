import { Router } from "express";
import { handleAddServices, handleServiceProviderLogin, handleServiceProviderRegister } from "../../controllers/serviceProviderController.js";

const router = Router();

router.post("/register", handleServiceProviderRegister);
router.post("/login", handleServiceProviderLogin);
router.post("/addServices",handleAddServices)

export default router;
