import Router from "express";
import auth from "./auth.routes";
import users from "./user.routes";

const router = Router();

router.use("/v1/auth", auth);
router.use("/v1/user", users);

export default router;