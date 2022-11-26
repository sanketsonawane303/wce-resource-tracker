import { Router } from "express";
import getKeys from "../controllers/key/getKeys.js";
import updateKeyStatus from "../controllers/key/updateKeyStatus.js";

import role from "../middlewares/role.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", role(["representative", "advisor"]), getKeys);
router.put(
  "/status",
  role(["representative"]),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "id_card", maxCount: 1 },
  ]),
  updateKeyStatus
);

export default router;
