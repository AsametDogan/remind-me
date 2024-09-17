import express from "express";
import userRouter from "./UserRoute";
import roleRouter from "./RoleRoute";
import statusRouter from "./StatusRoute";
import recurTypeRouter from "./RecurTypeRoute";
import categoryRouter from "./CategoryRoute";

const router = express.Router();
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/status", statusRouter);
router.use("/recur-type", recurTypeRouter);
router.use("/category", categoryRouter);
export default router;
