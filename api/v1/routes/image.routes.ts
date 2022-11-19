import Router from "express";
import utility from "../common/utility";
import {upload} from '../../../multer'
import Controller from "../controllers/image.controllers";
const router = Router();

// router.post("/", utility.authenticateUser, Controller.add);
router.post("/", upload.single('image'), Controller.add);
router.get("/", Controller.get);
router.get("/:id", Controller.getById);

export default router;
