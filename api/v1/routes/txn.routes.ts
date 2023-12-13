import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/txn.controllers";

const router = Router();

// for admin only
router.get("/", utility.authenticateAdmin, Controller.getTxn);
router.post("/add-money", utility.authenticateUser,  Controller.addTxn);
router.get("/history", utility.authenticateUser, Controller.getTxnByUser);
router.get("/verify/:txnNum", Controller.verify);
router.get("/history/:userId", utility.authenticateUser, Controller.getTxnByUserId);
router.get("/:id", utility.authenticateUser, Controller.getTxnById);
// router.get("/history",Controller.getTxn);
// router.get("/history/:userId", utility.authenticateUser, Controller.getTxn);
router.put("/approve/:id", utility.authenticateAdmin, Controller.approveTxn);
router.put("/reject/:id", utility.authenticateAdmin, Controller.rejectTxn);




export default router;
