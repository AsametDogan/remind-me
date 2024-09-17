import { Router } from "express";
import StatusController from "../controllers/StatusController";

const statusRouter: Router = Router();
const statusController = new StatusController();

statusRouter.post("/", statusController.create);
statusRouter.get("/", statusController.getAll);
statusRouter.delete("/:id", statusController.delete);
statusRouter.put("/:id", statusController.rename);

export default statusRouter;
