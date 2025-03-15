import express from "express"
import {getUserRole } from "../controllers/userRoles"

//instance of router 
const router = express.Router()

//create the routs
router.get("/", getUserRole)
// router.get("/", getUser);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.patch("/:id", patchUser);

export default router