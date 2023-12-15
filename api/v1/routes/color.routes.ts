import Router from "express";
import utility from "../common/utility";
import Controller from "../controllers/color.controllers";
const router = Router();


router.post("/", Controller.add);
router.get("/", Controller.get);
router.post("/join", utility.authenticateUser, Controller.join);
router.get("/join", utility.authenticateUser, Controller.getJoinList);
// router.get("/:id", Controller.getById);

export default router;
