import Router from "express";

import Controller from "../controllers/data.controllers";
const router = Router();

router.post("/contact-us",  Controller.addContactUs);
router.get("/contact-us",  Controller.getContactUs);
router.post("/support",  Controller.addSupport);
router.get("/support",  Controller.getSupport);

export default router;
