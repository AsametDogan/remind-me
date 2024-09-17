import { Router } from "express";
import ReminderController from "../controllers/ReminderController";

const reminderRouter: Router = Router();
const reminderController = new ReminderController();

reminderRouter.post("/", reminderController.create);
reminderRouter.get("/", reminderController.getAll);
reminderRouter.put("/:id", reminderController.update);
reminderRouter.delete("/:id", reminderController.delete);

export default reminderRouter;
