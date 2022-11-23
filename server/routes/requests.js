import { Router } from "express";

import role from "../middlewares/role.js";
import addRequest from "../controllers/request/addRequest.js";
import getRequests from "../controllers/request/getRequests.js";
import approveRequest from "../controllers/request/approveRequest.js";
import updateRequest from "../controllers/request/updateRequest.js";
import addReport from "../controllers/request/addReport.js";
import deleteRequest from "../controllers/request/deleteRequest.js";

const router = Router();

router.post("/", role(["representative"]), addRequest);
router.get("/", getRequests);
router.post("/approve", role(["advisor", "hod"]), approveRequest);
router.put("/approve", role(["representative"]), updateRequest);
router.put("/report", role(["representative"]), addReport);
router.delete("/:id", role(["representative"]), deleteRequest);

export default router;
