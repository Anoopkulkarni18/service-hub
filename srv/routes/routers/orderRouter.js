import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
} from "./../../controllers/orderController.js";
import { verifyToken } from "./../../controllers/serviceProviderController.js";

const router = Router();
router.post("/create", verifyToken, createOrder);
router.get("/getAllOrders", verifyToken, getOrders);
router.get("/getOrder/:orderId", verifyToken, getOrder);
router.get("/acceptOrder/:orderId", verifyToken, acceptOrder);

export default router;
