import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/auth.controllers";
const router = Router();

router.post("/signup", Controller.signup);
router.post("/login", Controller.login);
router.post("/login-with-phone", Controller.loginWithPhone);
router.post("/verify-phone", Controller.verifyPhone);
router.put("/forget-password", Controller.forgotPassword);
// router.put("/accept/:userId", Controller.acceptUser);
// router.put("/change_password", utility.authenticateUser, Controller.changePassword);
// router.put("/reset_password", Controller.resetPassword);

export default router;
