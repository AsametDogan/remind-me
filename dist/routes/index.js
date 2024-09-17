"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./UserRoute"));
const RoleRoute_1 = __importDefault(require("./RoleRoute"));
const StatusRoute_1 = __importDefault(require("./StatusRoute"));
const RecurTypeRoute_1 = __importDefault(require("./RecurTypeRoute"));
const CategoryRoute_1 = __importDefault(require("./CategoryRoute"));
const router = express_1.default.Router();
router.use("/user", UserRoute_1.default);
router.use("/role", RoleRoute_1.default);
router.use("/status", StatusRoute_1.default);
router.use("/recur-type", RecurTypeRoute_1.default);
router.use("/category", CategoryRoute_1.default);
exports.default = router;
