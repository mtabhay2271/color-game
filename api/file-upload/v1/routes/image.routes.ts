import Router from "express";
import utility from "../common/utility";

import ImageController from "../controllers/image.controllers";
const router = Router();

router.get("/upload", ImageController.upload);

export default router;
