import { Router } from "express";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import subCategoryRouter from "./routers/subCategoryRouter.js";
import serviceRouter from "./routers/serviceRouter.js";
import subServiceRouter from "./routers/subServiceRouter.js";
import serviceProviderRouter from "./routers/serviceProviderRouter.js";
import orderRouter from "./routers/orderRouter.js";

const router = Router();
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/service", serviceRouter);
router.use("/subService", subServiceRouter);
router.use("/serviceProvider", serviceProviderRouter);
router.use("/order", orderRouter);

export default router;
