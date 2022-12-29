import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/txn.controllers";

const router = Router();

router.post("/add-money", utility.authenticateUser,  Controller.addTxn);
router.get("/history", utility.authenticateUser, Controller.getTxn);
// router.get("/history/:userId", utility.authenticateUser, Controller.getTxn);
router.put("/approve/:id", utility.authenticateUser, Controller.approveTxn);
router.put("/reject/:id", utility.authenticateUser, Controller.rejectTxn);


export default router;
