import express from "express"
import { createUser, deleteUser, getUserById, getUser, updateUser,patchUser } from "../controllers/userController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createUser)
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id", patchUser);

export default router