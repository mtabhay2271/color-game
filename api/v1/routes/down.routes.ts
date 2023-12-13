import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/down.controllers";
const router = Router();
//using
router.get("/", utility.authenticateUser, Controller.downlineList);
//using
router.get("/count-data", utility.authenticateUser, Controller.countData);


export default router;
