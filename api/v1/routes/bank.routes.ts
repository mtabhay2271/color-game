import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/bank.controllers";
const router = Router();

router.post("/", utility.authenticateUser,  Controller.addBankDetails);
router.get("/", utility.authenticateUser, Controller.getBankDetails);
router.get("/balance", utility.authenticateUser, Controller.getBalance);

export default router;
