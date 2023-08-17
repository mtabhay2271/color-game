import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/video.controllers";
const router = Router();

router.post("/", Controller.add);
router.get("/", Controller.get);
router.get("/:courseId", Controller.GetVideoByCourseId);

export default router;
