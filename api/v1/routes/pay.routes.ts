import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/pay.controllers";
const router = Router();

router.get("/", utility.authenticateUser, Controller.getUpi)
// router.post("/", utility.authenticateUser, Controller.createUpi)

export default router;
