import { Router } from "express";
import EventController from "../controllers/EventController";
import { authMiddleware } from "../middleware/authMiddleware";

const eventRouter: Router = Router();
const eventController = new EventController();

eventRouter.post("/", authMiddleware([]), eventController.create);
eventRouter.get("/", eventController.getMyEvents);
eventRouter.put("/:id", eventController.updateEvent);
eventRouter.delete("/:id", eventController.deleteEvent);

export default eventRouter;
