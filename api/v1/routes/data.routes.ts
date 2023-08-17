import Router from "express";
import utility from "../common/utility";

import Controller from "../controllers/data.controllers";
const router = Router();

router.post("/contact_us",  Controller.addContactUs);
router.get("/contact_us",  Controller.getContactUs);
router.get("/payment",  Controller.getUpi);

export default router;
