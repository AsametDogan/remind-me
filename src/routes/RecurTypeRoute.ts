import { Router } from "express";
import RecurTypeController from "../controllers/RecurTypeController";

const recurTypeRouter: Router = Router();
const recurTypeController = new RecurTypeController();

recurTypeRouter.post("/", recurTypeController.create);
recurTypeRouter.get("/", recurTypeController.getAll);
recurTypeRouter.put("/:id", recurTypeController.rename);
recurTypeRouter.delete("/:id", recurTypeController.delete);

export default recurTypeRouter;
