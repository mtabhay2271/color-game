import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/reword.controllers";

const router = Router();

// for admin only
router.get("/", utility.authenticateAdmin, Controller.getReword);




export default router;
