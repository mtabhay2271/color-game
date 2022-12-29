import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/users.controllers";

const router = Router();

// router.get("/list", utility.authenticateUser, Controller.getUserList);
router.get("/list", Controller.getUserList);
// router.get("/profile", utility.authenticateUser, UserController.userDetails);
// router.get("/data", utility.authenticateUser, UserController.data);
// router.put("/update-payment-ref", utility.authenticateUser, UserController.addPaymentRefNumber);

export default router;
