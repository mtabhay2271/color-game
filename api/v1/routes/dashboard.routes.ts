import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/dashboard.controller";
const router = Router();

router.get("/", utility.authenticateUser, Controller.getDashboardContent);


export default router;
