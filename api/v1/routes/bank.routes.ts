import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/bank.controllers";
const router = Router();

router.post("/", utility.authenticateUser,  Controller.addBankDetails);
router.get("/", utility.authenticateUser, Controller.getBankDetails);
router.post("/support",  Controller.addSupport);
router.get("/support",  Controller.getSupport);

export default router;
