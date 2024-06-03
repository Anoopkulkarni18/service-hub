import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  acceptOrder,
  getSPOrders,
  cancelOrder,
  getSPCompletedOrders,
} from "./../../controllers/orderController.js";
import { verifyToken } from "./../../controllers/serviceProviderController.js";

const router = Router();
router.post("/create", verifyToken, createOrder);
router.get("/getAllOrders", verifyToken, getOrders);
router.get("/getOrder/:orderId", verifyToken, getOrder);
router.get("/SPOrders", verifyToken, getSPOrders);
router.get("/SPCompletedOrders", verifyToken, getSPCompletedOrders);
router.get("/acceptOrder/:orderId", verifyToken, acceptOrder); //specific to service provider
router.get("/cancelOrder/:orderId", verifyToken, cancelOrder); //specific to user

export default router;
