import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/txn.controllers";

const router = Router();

router.post("/add-money", utility.authenticateUser,  Controller.addTxn);
router.get("/history", utility.authenticateUser, Controller.getTxn);

export default router;
