import Router from "express";
import auth from "./auth.routes";
import users from "./user.routes";
import data from "./data.routes";
import bank from "./bank.routes";
import txn from "./txn.routes";
import dashboard from "./dashboard.routes";
import pay from "./pay.routes"
import vip from "./vip.routes."
import fund from "./fund.routes"
import down from "./down.routes"
import video from "./video.routes";
import course from "./course.routes";
import color from "./color.routes";

const router = Router();

router.use("/v1/auth", auth);
router.use("/v1/user", users);
router.use("/v1/down", down);
router.use("/v1/data", data);
router.use("/v1/bank", bank);
router.use("/v1/txn", txn);
router.use("/v1/dashboard", dashboard);
router.use("/v1/vip-number", vip);
router.use("/v1/funds", fund);
router.use("/v1/pay", pay);
router.use("/v1/videos", video);
router.use("/v1/course", course);
router.use("/v1/color", color);

export default router;