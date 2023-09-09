import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/users.controllers";
const router = Router();

// router.get("/filter",  Controller.filter);
router.get("/profile", utility.authenticateUser, Controller.userDetails);
router.get("/list", utility.authenticateAdmin, Controller.getUserList);
router.get("/top-earners", utility.authenticateUser, Controller.getUserMaxEarning);
router.get("/username/:username", utility.authenticateUser, Controller.userByUsername);
//using
router.get("/:userId", utility.authenticateUser, Controller.userById);
router.put("/transfer", utility.authenticateUser, Controller.transferBalance);
router.put("/update-payment-ref", utility.authenticateUser, Controller.addPaymentRefNumber);

// router.get("/data", utility.authenticateUser, Controller.data);


export default router;
