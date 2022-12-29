import Router from "express";
import auth from "./auth.routes";
import data from "./data.routes";
import color from "./color.routes";
import bank from "./bank.routes";
import txn from "./txn.routes";
import image from "./image.routes";
import users from "./user.routes";

const router = Router();

router.use("/v1/auth", auth);
router.use("/v1/data", data);
router.use("/v1/color", color);
router.use("/v1/image", image);
router.use("/v1/bank", bank);
router.use("/v1/txn", txn);
router.use("/v1/user", users);

export default router;