import Router from "express";
import auth from "./auth.routes";
import users from "./user.routes";
import data from "./data.routes";
import bank from "./bank.routes";
import txn from "./txn.routes";
import dashboard from "./dashboard.routes";
import pay from "./pay.routes"
import down from "./down.routes"
import reword from "./reword.routes";
import color from "./color.routes";
import lottery from "./lottery.routes";

const router = Router();

router.use("/v1/auth", auth);
router.use("/v1/user", users);
router.use("/v1/down", down);
router.use("/v1/data", data);
router.use("/v1/bank", bank);
router.use("/v1/txn", txn);
router.use("/v1/dashboard", dashboard);
router.use("/v1/pay", pay);
router.use("/v1/reword", reword);
router.use("/v1/color", color);
router.use("/v1/lottery", lottery);

export default router;