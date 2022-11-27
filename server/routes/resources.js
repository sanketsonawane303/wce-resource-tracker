import { Router } from "express";
import getResources from "../controllers/resource/getResources.js";
import createResource from "../controllers/resource/createResource.js";

import role from "../middlewares/role.js";

const router = Router();

router.get("/", getResources);
router.post("/", role(["admin"]), createResource);

export default router;
