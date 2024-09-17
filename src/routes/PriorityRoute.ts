import { Router } from "express";
import PriorityController from "../controllers/PriorityController"; 

const priorityRouter: Router = Router();
const priorityController = new PriorityController();

priorityRouter.post("/", priorityController.create);
priorityRouter.get("/", priorityController.getAll);
priorityRouter.put("/:id", priorityController.update);
priorityRouter.delete("/:id", priorityController.delete);

export default priorityRouter;
