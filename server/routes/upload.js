import { Router } from "express";
import uploadId from "../controllers/upload/uploadId.js";

import role from "../middlewares/role.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post(
  "/id",
  role(["helper"]),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "id_card", maxCount: 1 },
  ]),
  uploadId
);
export default router;
