import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/auth.controllers";
const router = Router();

router.post("/signup", Controller.signup); 
router.post("/login", Controller.login);
router.put("/forget-password", Controller.forgotPassword);
router.post("/verify-otp", Controller.verifyOtp);
router.put("/reset-password", Controller.resetPassword);
router.put("/change-password",utility.authenticateUser, Controller.changePassword);
router.patch("/change-password-by-admin", utility.authenticateAdmin, Controller.changePasswordByAdmin);
// router.post("/login-with-phone", Controller.loginWithPhone);
// router.put("/accept/:userId", Controller.acceptUser);
// router.put("/change_password", utility.authenticateUser, Controller.changePassword);

//adding bank
// router.post("/add-bank", Controller.addBank);


export default router;
