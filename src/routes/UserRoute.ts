import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.put("/", authMiddleware([]), userController.update);
// userRouter.delete("/", authMiddleware([""]), userController.delete);
userRouter.get("/", authMiddleware([]), userController.getMe);

export default userRouter;
