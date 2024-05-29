import { Router } from "express";
import {
  getSingleUser,
  handleLogin,
  handleRegister,
} from "../../controllers/userController.js";
import { verifyToken } from "../../controllers/serviceProviderController.js";

const router = Router();
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/getSingleUser",verifyToken, getSingleUser);


export default router;
