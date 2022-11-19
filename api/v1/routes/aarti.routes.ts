import Router from "express";

import Controller from "../controllers/aarti.controllers";
const router = Router();


router.post("/", Controller.add);
router.get("/", Controller.get);
router.get("/:id", Controller.getById);

export default router;
