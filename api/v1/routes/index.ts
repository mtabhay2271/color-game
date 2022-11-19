import Router from "express";
import auth from "./auth.routes";
import data from "./data.routes";
import video from "./video.routes";
import aarti from "./aarti.routes";
import gita from "./gita.routes";
import image from "./image.routes";
// import users from "./user.routes";

const router = Router();

router.use("/v1/auth", auth);
router.use("/v1/data", data);
router.use("/v1/video", video);
router.use("/v1/aarti", aarti);
router.use("/v1/gita", gita);
router.use("/v1/image", image);
// router.use("/v1/user", users);

export default router;