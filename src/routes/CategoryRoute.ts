import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import CategoryController from "../controllers/CategoryController";

const categoryRouter: Router = Router();
const categoryController = new CategoryController();

categoryRouter.post("/", authMiddleware([]), categoryController.create);
categoryRouter.get("/", authMiddleware([]), categoryController.getMyCategories);
categoryRouter.put("/:id", categoryController.rename);
categoryRouter.delete("/:id", categoryController.delete);
categoryRouter.get("/all", categoryController.getAll);

export default categoryRouter;
