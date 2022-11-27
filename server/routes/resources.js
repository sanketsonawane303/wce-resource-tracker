import { Router } from "express";
import getResources from "../controllers/resource/getResources";
import createResource from "../controllers/resource/createResource";

import role from "../middlewares/role.js";

const router = Router();

router.get("/", getResources);
router.post("/", role(["admin"]), createResource);

export default router;
