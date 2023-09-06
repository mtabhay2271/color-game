import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/txn.controllers";

const router = Router();

// for admin only
//using
router.get("/", utility.authenticateAdmin, Controller.getTxn);
//using
router.post("/", utility.authenticateUser, Controller.addTxn);
router.get("/history", utility.authenticateUser, Controller.getTxnByUser);
router.get("/verify/:txnNum", Controller.verify);

//using
router.get("/history/:userId", utility.authenticateUser, Controller.getTxnByUserId);
router.get("/:id", utility.authenticateUser, Controller.getTxnById);
// router.get("/history",Controller.getTxn);
// router.get("/history/:userId", utility.authenticateUser, Controller.getTxn);

//using
router.put("/approve/:id", utility.authenticateAdmin, Controller.approveTxn);
//using
router.put("/reject/:id", utility.authenticateAdmin, Controller.rejectTxn);




export default router;
