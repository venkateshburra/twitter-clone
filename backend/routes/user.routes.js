import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { followUnFollowUser, getSuggestedUser, getUserProfile, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUser);
router.post('/follow/:id', protectRoute, followUnFollowUser);
router.post('/update', protectRoute, updateUser);


export default router;