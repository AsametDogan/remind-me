import { Router } from "express";
import RoleController from "../controllers/RoleController";

const roleRouter: Router = Router();
const roleController = new RoleController();

roleRouter.post("/", roleController.create);
roleRouter.get("/", roleController.getAll);
roleRouter.put("/:id", roleController.rename);
roleRouter.delete("/:id", roleController.delete);

export default roleRouter;
