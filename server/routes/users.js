import { Router } from "express";

import auth from "../middlewares/auth.js";
import role from "../middlewares/role.js";
import signUp from "../controllers/user/signUp.js";
import signIn from "../controllers/user/signIn.js";
import getUser from "../controllers/user/getUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import updateUser from "../controllers/user/updateUser.js";

const router = Router();

router.post("/signup", [auth, role(["admin"])], signUp);
router.post("/signin", signIn);
router.get("/", auth, getUser);
router.delete("/:id", [auth, role(["admin"])], deleteUser);
router.put("/", [auth, role(["admin"])], updateUser);

export default router;
