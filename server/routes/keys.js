import { Router } from "express";
import getKeys from "../controllers/key/getKeys.js";

import role from "../middlewares/role.js";

const router = Router();

router.get("/", role(["representative", "advisor"]), getKeys);

export default router;
