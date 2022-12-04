import { Router } from "express";

import auth from "../middlewares/auth.js";
import role from "../middlewares/role.js";
import signUp from "../controllers/user/signUp.js";
import signIn from "../controllers/user/signIn.js";
import getUsers from "../controllers/user/getUsers.js";
import deleteUser from "../controllers/user/deleteUser.js";
import updateUser from "../controllers/user/updateUser.js";
import updatePassword from "../controllers/user/updatePassword.js";

const router = Router();

router.post("/signup", [auth, role(["admin"])], signUp);
router.post("/signin", signIn);
router.get("/", auth, getUsers);
router.delete("/:id", [auth, role(["admin"])], deleteUser);
router.put("/", [auth, role(["admin"])], updateUser);
router.put("/password", auth, updatePassword);

export default router;
