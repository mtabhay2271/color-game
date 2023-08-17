import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/fund.controllers";
const router = Router();

router.get("/", utility.authenticateAdmin, Controller.getFunds)
router.get("/:userId", utility.authenticateUser, Controller.getFundsById)
router.post("/", utility.authenticateUser, Controller.addFund);
router.patch("/approve/:id", utility.authenticateAdmin, Controller.approveFunds)
router.patch("/reject/:id", utility.authenticateAdmin, Controller.rejectFunds)

export default router;
