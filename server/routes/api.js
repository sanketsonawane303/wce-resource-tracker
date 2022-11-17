import { Router } from "express";
import auth from "../middlewares/auth.js";

import users from "./users.js";
import requests from "./requests.js";

const router = Router();

router.use("/users", users);
router.use("/requests", auth, requests);

export default router;
