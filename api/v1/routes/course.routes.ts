import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/course.controllers";
const router = Router();

router.post("/", utility.authenticateUser, Controller.add);
router.get("/", Controller.get);
router.get("/:courseId", Controller.getById);

export default router;
