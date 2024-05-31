import { Router } from "express";
import {
  getSingleUser,
  handleLogin,
  handleRegister,
  getCart,
  updateCart,
} from "../../controllers/userController.js";
import { verifyToken } from "../../controllers/serviceProviderController.js";

const router = Router();
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/getSingleUser", verifyToken, getSingleUser);
router.post("/updateCart", verifyToken, updateCart);
router.get("/cart", verifyToken, getCart);

export default router;
