import { Router } from "express";

import role from "../middlewares/role.js";
import addRequest from "../controllers/request/addRequest.js";
import getRequests from "../controllers/request/getRequests.js";
import approveRequest from "../controllers/request/approveRequest.js";
import updateRequest from "../controllers/request/updateRequest.js";

const router = Router();

router.post("/", role(["representative"]), addRequest);
router.get("/", getRequests);
router.post("/approve", role(["advisor", "hod"]), approveRequest);
router.put("/approve", role(["representative"]), updateRequest);

export default router;
