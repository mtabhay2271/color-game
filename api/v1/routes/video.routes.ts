import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/video.controllers";
const router = Router();

// router.post("/", utility.authenticateUser, Controller.add);
router.post("/", Controller.add);
router.get("/", Controller.get);

export default router;
