import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { DeleteNotification, getNotification } from "../controllers/notification.controller.js";

const router = Router();

router.get('/', protectRoute, getNotification);
router.delete('/', protectRoute, DeleteNotification);


export default router;