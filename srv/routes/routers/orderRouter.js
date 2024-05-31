import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
  getSPOrders,
} from "./../../controllers/orderController.js";
import { verifyToken } from "./../../controllers/serviceProviderController.js";

const router = Router();
router.post("/create", verifyToken, createOrder);
router.get("/getAllOrders", verifyToken, getOrders);
router.get("/getOrder/:orderId", verifyToken, getOrder);
router.get("/SPOrders", verifyToken, getSPOrders);
router.get("/acceptOrder/:orderId", verifyToken, acceptOrder);

export default router;
